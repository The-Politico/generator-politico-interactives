Publishing
==========

We maintain two S3 buckets for publishing: staging and production. Our staging bucket is used for testing and sharing previews internally.

Gulp handles publishing with the :code:`gulp publish` command. By default, :code:`gulp publish` targets our staging bucket. You should **always** test your project on staging before deploying to production by simply running :code:`gulp publish`. 

You must explicitly tell gulp to target production when you want to publish to production. When you are ready to publish to production, follow these steps.

1. Complete the meta information in :code:`meta.json`

2. Run the gulp's publish task.

  ::

    $ gulp publish --production

.. note::

  If you need to invalidate files you've previously published in CloudFront's cache, add the :code:`--invalidate` flag:

  ::

      $ gulp publish --production --invalidate

Your dist folder will be synced to the directory specified under :code:`publishPath` in :code:`meta.json`, which means files in AWS at that location that are `not` in your dist directory will be **deleted**.

The publish task will also version and gzip CSS and JS assets.

Previewing the rendered page
----------------------------

You can preview the rendered page by running:

::

  $ gulp preview

This will run the same render process as :code:`gulp publish`, but instead of pushing to AWS, it starts a local server inside the dist folder.
