# Developing

### Contents

The generator consists of 12 subgenerators.

Any required dependencies in each are in an array in each subgenerator's class `install` priority. They are installed via `yarnInstall`.

Here are the responsibilities of each subgenerator:

#### app
Prompts user for name of project.

Writes the following files:
- `.gitignore`
- `aws.json`
- `aws.json.example`
- `package.json`

Calls the following subgenerators:
- `gulp`
- `linters`
- `meta`
- `passphrase`
- `styles`
- `templates`

#### archie
Adds [archieml-pipe](https://github.com/The-Politico/archieml-pipe/) integration.

Writes the following files:
- `gulp/tasks/archie.js`


#### bundler-browserify
Writes files needed to implement a browserify bundler.

Writes the following files:
- `gulpfile.js`
- `gulp/tasks/browserify.js`
- `gulp/tasks/js-build.js`
- `gulp/tasks/js-watch.js`
- `gulp/tasks/nunjucks.js`
- `gulp/tasks/scss.js`
- `gulp/tasks/server.js`

#### bundler-webpack
Writes files needed to implement a webpack bundler. **Under development.**

Writes the following files:
- `webpack.config.js`
- `postcss.config.js`
- `gulpfile.js`
- `gulp/tasks/nunjucks.js`
- `gulp/tasks/webpack.js`

#### github
Creates a new remote GitHub repository and adds it as origin to local project directory.

#### gulp
Writes gulp tasks shared by all project types, including image optimization and resizing and aws publishing.

Writes the following files:
- `gulp/tasks/aws.js`
- `gulp/tasks/img-copy.js`
- `gulp/tasks/img-optimize.js`
- `gulp/tasks/img-resize.js`
- `gulp/tasks/nunjucks-watch.js`
- `gulp/index.js`

#### keys
Writes credentials to services such as GitHub, AWS and ngrok to `~/.politico/interactives.json`, encrypted with a passphrase. These credentials are decrypted and added to the environment when running gulp tasks.

#### linters
Installs correct dependencies for eslint.

Writes the following files:
- `src/.eslintrc`

#### meta
Writes project meta information, especially `meta.json`.

Writes the following files:
- `meta.json`
- `.gitignore`
- `package.json`
- `README.md`

#### passphrase
Writes a passphrase used to decrypt credentials.

Appends/writes to the following files:
- `.env`

Calls the following subgenerators:
- `keys`
- `github`

#### styles
Writes SCSS stylesheets and partials.

Writes the following files:
- `src/scss/main.scss`
- SCSS partials...

#### templates
Writes HTML and  templates for developing an interactive page.

Writes the following files:
- `src/images/_share.jpg`
- `src/js/main.js`
- `src/templates/base.html`
- `src/templates/index.html`
- `src/templates/meta/*`
- `src/templates/ads/*`
