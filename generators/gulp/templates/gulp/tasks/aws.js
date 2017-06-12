const confirm = require('gulp-confirm');
const rename = require('gulp-rename');
const awspublish = require('gulp-awspublish');
const invalidate = require('gulp-cloudfront-invalidate-aws-publish');
const gulp = require('gulp');
const fail = require('gulp-fail');
const gulpIf = require('gulp-if');
const gutil = require('gulp-util');
const fs = require('fs-extra');
const path = require('path');
const open = require('open');
const revAll = require('gulp-rev-all');

module.exports = (cb) => {
  const awsJson = fs.readJsonSync(
    path.resolve(process.cwd(), 'aws.json'));
  const meta = fs.readJsonSync(
    path.resolve(process.cwd(), 'meta.json'));
  const publisher = awspublish.create(awsJson);
  const awsDirectory = meta.publishPath;

  const headers = {
    'Cache-Control': 'max-age=300, no-transform, public',
  };

  const cloudFrontConfig = {
    distribution: awsJson.params.CloudFront,
    accessKeyId: awsJson.accessKeyId,
    secretAccessKey: awsJson.secretAccessKey,
    indexRootPath: true,
  };

  'asd'.replace(/\/$/, '').split('/');

  return gulp.src('./dist/**/*')
    .pipe(gulpIf(() => {
      // As a dumb check against syncing the entire bucket
      // we check to make sure you're putting your project at
      // least 2 directories deep.
      const depth = awsDirectory.replace(/\/$/, '').split('/').length;
      return depth < 2;
    }, fail(`Can't publish to ${awsDirectory}. Check meta.json and add a deeper publishPath.`)))
    .pipe(confirm({
      question: `You're about to publish this project to AWS under directory ${awsDirectory}. This will sync this directory with your local dist folder and may cause files to be deleted. Are you sure you want to do this?`,
      input: '_key:y',
    }))
    .pipe(rename((pubPath) => {
      // eslint-disable-next-line no-param-reassign
      pubPath.dirname = path.join(awsDirectory, pubPath.dirname.replace('.\\', ''));
    }))
    .pipe(revAll.revision())
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers, { force: false }))
    .pipe(publisher.sync(awsDirectory))
    // eslint-disable-next-line no-extra-boolean-cast
    .pipe(!!gutil.env.invalidate ? invalidate(cloudFrontConfig) : gutil.noop())
    .pipe(publisher.cache())
    .pipe(awspublish.reporter())
    .on('end', () => {
      open(meta.url);
      cb();
    });
};
