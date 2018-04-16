0.8.0 / 2018-04-16
==================

* Update default styles to new [politico-style](https://github.com/The-Politico/politico-style) package.

0.7.2 / 2018-01-30
==================

* Fix Twitter button on mobile

0.7.0 / 2017-12-??
==================

  * Gives correct ACL permissions to files deployed to staging bucket
  * Made image processing task synchronous so other tasks wait on it
  * Changed production bucket name and URL routing for new POLITICO structure
  * Built in rules for not gzipping videos
  * Gitignore compiled dist files
  * Changed JavaScript compiler to use [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) and [UglifyJS](https://github.com/mishoo/UglifyJS2).

  NOTE: If you are using an older version of the generator, and you need to redeploy, you **must** adjust two files in order to deploy to production again.

  First, in `gulp/tasks/aws.js`, change the production bucket to `interactives.politico.com`. Then, in `meta.json`, prepend your `publishPath` with `interactives/`.

  ```
    "publishPath": "interactives/2017/your-project-slug/",
    "stagingUrl": "https://s3.amazonaws.com/staging.interactives.politico.com/interactives/2017/your-project-slug/index.html",
    "url": "https://www.politico.com/interactives/2017/your-project-slug/",
  ```



0.6.1 / 2017-10-13
==================

  * CSS adjustments
  * New Typekit [Politico Interactive 2.0] - kills Jubliat, adds Franklin
  * Addition of supercube ads


0.5.2 / 2017-09-08
==================

  * Allow for multiple dev servers to run on different ports
  * Make Express router independent subgenerator in order to facilitate overwriting in dependent generators
  * Hard exit Gulp commands

0.5.1 / 2017-08-18
=================

  * Fix default meta tag templates

0.5.0 / 2017-08-17
=================

  * Complete rewrite of dev server architecture to use Express and Webpack

0.4.0 / 2017-07-16
==================

  * Merge pull request [#47](https://github.com/The-Politico/generator-politico-interactives/issues/47) from The-Politico/images
    Images
  * adds macro for srcsets
  * Adds gulp-responsive for image resizing. Updates readme.
  * changelog

0.3.5 / 2017-07-10
==================

  * changes repo to longhand for changelog

0.3.4 / 2017-07-10
==================

  * roll 0.3.4
  * Adds CSVs to ingored list for versioning.

0.3.3 / 2017-06-26
==================

  * new package
  * Adding new ad tags, also fixing spacing on share tools, and deleting cube

0.3.2 / 2017-06-26
==================

  * iterating the package - includes new ads
  * adding new sube and banner ads, updating base template to show cube1.html
  * HOTFIX: add newline to passphrase env write.
  * package.json
  * use shields badges

0.3.0 / 2017-06-25
==================

  * Merge pull request [#42](https://github.com/The-Politico/generator-politico-interactives/issues/42) from The-Politico/keys
    0.3.0
  * adds slack token to keys
  * changelog, readme and gulp rework for keys
  * keys to profile
  * initial on branch
  * closed [#39](https://github.com/The-Politico/generator-politico-interactives/issues/39)
  * 0.2.3
  * roll 0.2.3
  * Fixes [#33](https://github.com/The-Politico/generator-politico-interactives/issues/33). Fixes [#32](https://github.com/The-Politico/generator-politico-interactives/issues/32). Fixes [#31](https://github.com/The-Politico/generator-politico-interactives/issues/31).

0.2.2 / 2017-06-12
==================

  * fixes [#26](https://github.com/The-Politico/generator-politico-interactives/issues/26). Updates readme for restarting a project using subtasks

0.2.1 / 2017-06-12
==================

  * readme. 0.2.1
  * Merge pull request [#25](https://github.com/The-Politico/generator-politico-interactives/issues/25) from The-Politico/revision
    Revision
  * tested aws syncing, gzip and versioning. Roll 0.2.0
  * adds syncing behavior, static file versioning, gzip, and a few tickets. Fixes [#24](https://github.com/The-Politico/generator-politico-interactives/issues/24), fixes [#23](https://github.com/The-Politico/generator-politico-interactives/issues/23), fixes [#22](https://github.com/The-Politico/generator-politico-interactives/issues/22), fixes [#21](https://github.com/The-Politico/generator-politico-interactives/issues/21), fixes [#20](https://github.com/The-Politico/generator-politico-interactives/issues/20), fixes [#19](https://github.com/The-Politico/generator-politico-interactives/issues/19)

0.1.2 / 2017-06-05
==================

  * Fixes [#18](https://github.com/The-Politico/generator-politico-interactives/issues/18). Publishpath to be aws url fragment. Roll as 0.1.2

0.1.1 / 2017-05-31
==================

  * updating the css to version 0.1.1

0.1.0 / 2017-05-30
==================

  * roll 0.1.0

0.0.9 / 2017-05-30
==================

  * 0.0.9. Major refactor to remove embed templates. Adds UnCSS. Fixes [#17](https://github.com/The-Politico/generator-politico-interactives/issues/17), fixes [#16](https://github.com/The-Politico/generator-politico-interactives/issues/16), fixes [#15](https://github.com/The-Politico/generator-politico-interactives/issues/15), fixes [#14](https://github.com/The-Politico/generator-politico-interactives/issues/14), fixes [#12](https://github.com/The-Politico/generator-politico-interactives/issues/12), fixes [#11](https://github.com/The-Politico/generator-politico-interactives/issues/11), fixes [#10](https://github.com/The-Politico/generator-politico-interactives/issues/10), fixes [#9](https://github.com/The-Politico/generator-politico-interactives/issues/9).
  * Update README.md

0.0.8 / 2017-05-15
==================

  * roll 0.0.8 -- now with more STYLEZ
  * Merge branch 'master' of github.com:The-Politico/generator-politico-interactives
  * new styles including comments
  * update development readme

0.0.7 / 2017-05-12
==================

  * add archieml-pipe. Roll 0.0.7

0.0.6 / 2017-05-11
==================

  * 0.0.6 fixes [#8](https://github.com/The-Politico/generator-politico-interactives/issues/8), fixes [#7](https://github.com/The-Politico/generator-politico-interactives/issues/7), fixes [#6](https://github.com/The-Politico/generator-politico-interactives/issues/6)

0.0.5 / 2017-04-28
==================

  * Multiple embed improvements, fixes [#5](https://github.com/The-Politico/generator-politico-interactives/issues/5), fixes [#4](https://github.com/The-Politico/generator-politico-interactives/issues/4), fixes[#3](https://github.com/The-Politico/generator-politico-interactives/issues/3).

0.0.4 / 2017-04-23
==================

  * add styles
  * fix readme code blocks

0.0.3 / 2017-04-19
==================

  * change logging to console in archie

0.0.2 / 2017-04-18
==================

  * Adds archieML task
  * logo
  * version badge

0.0.1 / 2017-04-13
==================

  * roll 0.0.1
  * skeleton done
  * webpack functioning, but needs weird extra yarn install
  * browserify. bugs on webpack
  * browserify on page
  * to webpack errors
  * touchpoint
  * initial
