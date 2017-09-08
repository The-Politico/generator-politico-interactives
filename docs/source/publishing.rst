Publishing
==========

1. Complete the meta information in :code:`meta.json`

2. Run the gulp's publish task.

  ::

    $ gulp publish

.. note::

  If you need to invalidate files you've previously published in CloudFront's cache, add the :code:`--invalidate` flag:

  ::

      $ gulp publish --invalidate

Your dist folder will be synced to the directory specified under :code:`publishPath` in :code:`meta.json`, which means files in AWS at that location that are `not` in your dist directory will be **deleted**.

The publish task will also version and gzip CSS and JS assets.

Previewing the rendered page
----------------------------

You can preview the rendered page by running:

::

  $ gulp preview

This will run the same render process as :code:`gulp publish`, but instead of pushing to AWS, it starts a local server inside the dist folder.
