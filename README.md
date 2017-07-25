![POLITICO](https://rawgithub.com/The-Politico/src/master/images/logo/badge.png)

# generator-politico-interactives [![npm](https://img.shields.io/npm/v/generator-politico-interactives.svg)](https://www.npmjs.com/package/generator-politico-interactives)

A [Yeoman](http://yeoman.io) generator to scaffold a development environment for building POLITICO interactives.

### What it does:

- Scaffolds your project's development directory.
- Compiles SCSS and bundles JS written in either ES5 or ES2015 using your choice of browserify or webpack.
- Creates responsive image sets optimized for mobile devices.
- Publishes your project to an Amazon S3 bucket.



## How to use



### Responsive images

To make responsive images that load more quickly on smaller devices, drop a high-res jpg image into `src/images` directory. Then run:

```bash
$ gulp img
```

This is will create four optimized images from your source at 400, 800, 1200 and 1600 pixels width.

You can easily include these images in your template with our custom `jpg` nunjucks macro. For example:

```html
<figure>
    {{ jpg('cat', alt='A cat!') }}
    <figcaption>A pretty cat</figcaption>
</figure>
```

... will render as ...

```html
<figure>
    <img src="images/cat-1800.jpg" srcset="images/cat-400.jpg 400w, images/cat-800.jpg 800w, images/cat-1200.jpg 1200w, images/cat-1800.jpg 1800w" alt="A cat!">
    <figcaption>A pretty cat</figcaption>
</figure>
```


## Developing

To develop, clone this repository to a directory on your local computer. Move into the folder and run:

```bash
$ npm link
```

This lets you use your local copy of the generator whenever you run `yo politico-interactives`, which lets you test any changes you make to the generator.

**Always test your changes by running them locally _before_ publishing to github or npm.**

#### For designers

To change styles, simply update the scss files in the following directory within this generator

- `generators/styles/templates/src/scss/`

If you need to add a new SCSS file, ask a developer to help you write the line that loads your new file into a user's development directory.

If you need to make changes to HTML templates, they are here:

- `generators/templates/src/templates`

Again, if you need to add a new HTML file, rather than simply change an old one, talk to a developer.

#### Publishing

Once you're satisfied with your changes and have tested your update, publish your updates through the following steps:
1. Increment the version number in `package.json`, e.g., `0.0.3` --> `0.0.4`
2. Commit your changes to github
3. Run:
    ```bash
    $ npm publish
    ```
4. Update changelog (using [changelog](https://www.npmjs.com/package/changelog)):
    ```bash
    $ changelog generator-politico-interactives all > CHANGELOG.md
    ```


#### For developers

See the [development docs](DEVELOPING.md) and the [CHANGELOG](CHANGELOG.md).
