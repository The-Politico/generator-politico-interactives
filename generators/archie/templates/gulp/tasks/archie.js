// Cobbled together from several ArchieML resources, namely:
// + https://github.com/stuartathompson/node-archieml-boilerplate
// + https://github.com/Quartz/aml-gdoc-server
// + https://github.com/newsdev/archieml-js/blob/master/examples/google_drive.js

const fs = require('fs-extra');
const readline = require('readline');
const google = require('googleapis');
const GoogleAuth = require('google-auth-library');
const archieml = require('archieml');
const path = require('path');
const url = require('url');
const open = require('open');
const htmlparser = require('htmlparser2');
const Entities = require('html-entities').AllHtmlEntities;
const http = require('http');
const inquirer = require('inquirer');

let oauth2Client;
let archie;
let fileId;

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const TOKEN_DIR = process.cwd();
const TOKEN_PATH = path.resolve(TOKEN_DIR, 'google-token.json');


/**
 * @param {Object} token The token to store to disk.
 */
const storeToken = (token) => {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  // eslint-disable-next-line no-console
  console.log(`Token stored to ${TOKEN_PATH}`);
};

/**
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
const getNewToken = (oauth, callback) => {
  const authUrl = oauth.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    approval_prompt: 'force',
  });

  // Server to receive auth code
  const hostname = 'localhost';
  const port = 6006;
  const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <h1
        style="padding:10px 20px;
              display: inline-block;
              margin: 20px 0;
              text-align: left;
              background:#eee;
              color:#3b5998;
              font-family:monospace;"
      >
      ${queryObject.code}#
      </h1>
    `);
  });

  server.listen(port, hostname);

  // eslint-disable-next-line no-console
  console.log('Authorize this app by visiting this url: ', authUrl);
  open(authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code you receive from Google here: ', (code) => {
    rl.close();
    server.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log('Error while trying to retrieve access token: ', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
};

/**
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (credentials, callback) => {
  const clientSecret = credentials.clientSecret;
  const clientId = credentials.clientId;
  const redirectUrl = credentials.redirectUrl;
  const auth = new GoogleAuth();
  oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      getNewToken(oauth2Client, () => callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
};

const parseGDoc = (dom) => {
  const tagHandlers = {
    base(tag) {
      let str = '';
      tag.children.forEach((child) => {
        const func = tagHandlers[child.name || child.type] || false;
        if (func) str += func(child);
      });
      return str;
    },
    text(textTag) {
      return textTag.data;
    },
    span(spanTag) {
      return tagHandlers.base(spanTag);
    },
    p(pTag) {
      return `${tagHandlers.base(pTag)}\n`;
    },
    a(aTag) {
      let href = aTag.attribs.href;
      if (href === undefined) return '';

      // extract real URLs from Google's tracking
      // from: http://www.google.com/url?q=http%3A%2F%2Fwww.nytimes.com...
      // to: http://www.nytimes.com...
      if (
        aTag.attribs.href && url.parse(aTag.attribs.href, true).query &&
        url.parse(aTag.attribs.href, true).query.q
      ) {
        href = url.parse(aTag.attribs.href, true).query.q;
      }

      let str = `<a href="${href}">`;
      str += tagHandlers.base(aTag);
      str += '</a>';
      return str;
    },
    li(tag) {
      return `* ${tagHandlers.base(tag)}\n`;
    },
  };

  ['ul', 'ol'].forEach((tag) => {
    tagHandlers[tag] = tagHandlers.span;
  });
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((tag) => {
    tagHandlers[tag] = tagHandlers.p;
  });

  try {
    const body = dom[0].children[1];
    let parsedText = tagHandlers.base(body);

    // Convert html entities into the characters as they exist in the google doc
    const entities = new Entities();
    parsedText = entities.decode(parsedText);

    // Remove smart quotes from inside tags
    parsedText = parsedText.replace(/<[^<>]*>/g, match =>
      match.replace(/”|“/g, '"').replace(/‘|’/g, "'"));

    const archieData = archieml.load(parsedText);
    fs.writeJSON(
      path.resolve(process.cwd(), 'src/templates/data.json'),
      archieData);
    return archieData;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Cannot access that Google Doc (Are you sure you\'ve shared it?)', e);
  }
  return null;
};


/**
 * @param {Object} Google Drive authorization
 */
const getExportLink = (auth) => {
  const drive = google.drive({
    version: 'v2',
    auth,
  });
  drive.files.get({ fileId }, (er, doc) => {
    if (er) {
      // eslint-disable-next-line no-console
      console.log('Error accessing gdoc:', er);
      return;
    }
    const exportLink = doc.exportLinks['text/html'];
    oauth2Client._makeRequest({ // eslint-disable-line no-underscore-dangle
      method: 'GET',
      uri: exportLink,
    }, (err, body) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log('Error downloading gdoc', err);
        return;
      }
      const handler = new htmlparser.DomHandler((error, dom) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log('Error parsing gdoc', error);
          return;
        }
        parseGDoc(dom);
      });
      const parser = new htmlparser.Parser(handler);
      parser.write(body);
      parser.done();
    });
  });
};

const prompt = () => {
  const questions = [
    {
      type: 'input',
      name: 'docId',
      message: 'What\'s your Google doc ID?',
    },
    {
      type: 'input',
      name: 'clientId',
      message: 'What\'s your Google app client ID?',
    },
    {
      type: 'input',
      name: 'secretKey',
      message: 'What\'s your Google app client secret key?',
    },
  ];

  const archieJsonPath = path.resolve(process.cwd(), 'archie.json');

  if (!fs.existsSync(archieJsonPath)) {
    inquirer.prompt(questions).then((answers) => {
      fs.writeJsonSync(archieJsonPath, {
        docId: answers.docId,
        clientId: answers.clientId,
        clientSecret: answers.secretKey,
        redirectUrl: 'http://localhost:6006',
      });
      archie = fs.readJsonSync(archieJsonPath);
      fileId = archie.docId;
      authorize(archie, getExportLink);
    });
  } else {
    archie = fs.readJsonSync(archieJsonPath);
    fileId = archie.docId;
    authorize(archie, getExportLink);
  }
};

module.exports = () => {
  prompt();
};
