Building an interactive
=======================


Working with templates
----------------------

Templates are rendered using Nunjucks templating syntax. See Nunjucks' `template inheritance <https://mozilla.github.io/nunjucks/templating.html#template-inheritance>`_, `tags <https://mozilla.github.io/nunjucks/templating.html#tags>`_ and `builtin filters <https://mozilla.github.io/nunjucks/templating.html#builtin-filters>`_ for details on using the syntax to its full effect.

Template context
''''''''''''''''

Data to go into the template context can come from three places: an ArchieML doc, a spreadsheet, and the meta JSON file. Each of those data sources are prefixed in the template context. So, to use an Archie key, you would write:

.. code-block:: html+jinja
  
  {{ ARCHIE.key }}

Spreadsheet keys are prefixed with :code:`DATA`, and meta keys are prefixed with :code:`META`. For more, take a look at :code:`server/context.js`.

Includes
''''''''

When using a template include, you should prefix the include filename with an underscore. So :code:`graphic.html` should actually be :code:`_graphic.html`.

Markdown
''''''''

There is a custom filter included for rendering template context formatted in `Markdown <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet>`_:

.. code-block:: html+jinja

  <!-- Render context data with markdown -->
  {{someText|markdown}}

  <!-- Remove the outer paragraph tags with the strip option -->
  <h1>{{sectionTitle|markdown(strip=true)}}</h1>

Adding a new page
'''''''''''''''''

To add a new page to your interactive, use the :code:`new-page` subgenerator:

::
  
  $ yo politico-interactives:new-page

This will ask you to give a name for your page. You can see your new page by going to :code:`localhost:3000/my-new-page/index.html`.


Responsive images
-----------------

To make responsive images that load more quickly on smaller devices, drop a high-res jpg image into the :code:`src/images` directory. If you have :code:`gulp` running, then the image task should run automatically. If :code:`gulp` isn't running. then you can run the image task manually:

::

  $ gulp img

This is will create four optimized images from your source at 400, 800, 1200 and 1600 pixels width.

srcset macro
''''''''''''

You can easily include these images in your template with our custom :code:`jpg` nunjucks macro.

.. code-block:: html+jinja

  <figure>
      {{ jpg('cat', alt='A cat!') }}
      <figcaption>A pretty cat</figcaption>
  </figure>

Renders as:

.. code-block:: html

  <figure>
      <img src="images/cat-1800.jpg" srcset="images/cat-400.jpg 400w, images/cat-800.jpg 800w, images/cat-1200.jpg 1200w, images/cat-1800.jpg 1800w" alt="A cat!">
      <figcaption>A pretty cat</figcaption>
  </figure>


Other image assets
''''''''''''''''''

For image assets that should not be converted using our responsive image task, such as svgs and gifs, you should save those directly in :code:`dist/images`.


Data assets
-----------

For data that needs to be used on the front-end (i.e. data for a D3 chart), you should place those files in :code:`dist/data` directly. 

If you need to use files in :code:`src/data`, such as data pulled in from :code:`gulp spreadsheet`, those files will be automatically copied to dist when :code:`gulp` is running. To copy files manually, run:

::

  $ gulp data


ArchieML
--------

Optionally, there is a gulp task available which allows you to use `ArchieML <http://archieml.org/#demo>`_ and Google Docs to render content into your templates.

You will be asked if you want to use ArchieML when you start the generator. You can also add it to a project later by running:

::

  $ yo politico-interactives:archie


You will need to provide the ID for the Google doc you wish to use, which you can get from the URL of your doc:

https://docs.google.com/document/d/**yourGoogleIDhere**/edit

.. note::

  Your document must have access set at least to :code:`Anyone with the link can view` to use this task.


The archie gulp task will access your Google doc and overwrite :code:`src/data/archie.json` with ArchieML data. To run it:

::

  $ gulp archie


.. note::

  On first running the task, you will need to authorize access to the document through Google. The task will open the authorization dialogue in your browser. Follow the prompts and then copy and paste the code returned by Google.

  This access token will be saved in :code:`archie-token.json` so that you can run the task subsequently without needing to re-authorize.

.. note::

    If you've added ArchieML after the project was already created, you'll also need to add the task to your gulpfile. Simply edit it into the array of other tasks in :code:`gulpfile.js`:

    .. code-block:: javascript

      const gulp = require('./gulp')([
        'aws',
        'archie', // Add this line
        // ...
      ]);

Spreadsheet
-----------

There is an optional gulp task for loading a Google Spreadsheet into JSON for use in your Nunjucks templates (or to load onto the page directly). 

To set it up, run:

::
  
  $ yo politico-interactives:spreadsheet

This will ask you for a spreadsheet ID. You can get that from the URL of your spreadsheet:

https://docs.google.com/spreadsheets/d/**yourGoogleIDhere**/edit

The spreadsheet gulp task will overwrite :code:`src/data/data.json` with the data from the spreadsheet.

The conversion from spreadsheet to JSON takes each sheet and converts it to JSON using `copytext <https://github.com/rdmurphy/node-copytext>`_'s table converter. This makes each row an object, using the first row as a header row for keys inside the JSON object. 

This is customizable at a sheet level in :code:`gulp/tasks/spreadsheet.js`. See the `copytext <https://github.com/rdmurphy/node-copytext>`_ docs for more information on how to customize the parsing.

.. note::

    If you've added the spreadsheet task after the project was already created, you'll also need to add the task to your gulpfile. Simply edit it into the array of other tasks in :code:`gulpfile.js`:

    .. code-block:: javascript

      const gulp = require('./gulp')([
        'aws',
        'archie',
        'build',
        'dev',
        'data',
        'data-watch',
        'dist',
        'html',
        'img',
        'img-watch',
        'spreadsheet', // add this line
      ]);
