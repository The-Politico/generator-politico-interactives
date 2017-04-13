# Developing

### Contents

The generator consists of 8 subgenerators.

Any required dependencies in each are in an array in each subgenerator's class `install` priority. They are installed via `yarnInstall`.

Here are the responsibilities of each subgenerator:

#### app

Responsible for prompting for project meta data and the type of project a user wants to create. Then composes with the needed subgenerators.

Writes the following files:
- `.gitignore`
- `aws.json`
- `aws.json.example`
- `package.json`

#### templates-page
Writes HTML templates for developing an interactive page.

- `src/templates/base.html`
- `src/templates/index.html`

#### templates-embeddable
Writes HTML templates for developing an embeddable feature.

- `src/templates/base.html`
- `src/templates/index.html`
- `dist/embed.html`

#### bundler-browserify
Writes files needed to implement a browserify bundler.

- `gulpfile.js`
- `gulp/tasks/browserify.js`
- `gulp/tasks/js-build.js`
- `gulp/tasks/js-watch.js`
- `gulp/tasks/nunjucks.js`
- `gulp/tasks/scss.js`
- `gulp/tasks/server.js`
- `src/js/main.js`

#### bundler-webpack
Writes files needed to implement a webpack bundler.

- `webpack.config.js`
- `gulpfile.js`
- `gulp/tasks/nunjucks.js`
- `gulp/tasks/webpack.js`

#### styles
Writes SCSS stylesheets:

- `src/scss/main.scss`
- `src/scss/_colors.scss`
- `src/scss/_fonts.scss`

#### gulp
Writes gulp tasks shared by all project types, including image optimization and resizing and aws publishing.

- `gulp/tasks/aws.js`
- `gulp/tasks/img-copy.js`
- `gulp/tasks/img-optimize.js`
- `gulp/tasks/img-resize.js`
- `gulp/tasks/nunjucks-watch.js`
- `gulp/index.js`

#### linters
Installs correct dependencies for eslint.

- `src/.eslintrc`

### dependencies
