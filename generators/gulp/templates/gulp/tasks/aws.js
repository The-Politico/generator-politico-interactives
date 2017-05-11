const confirm = require('gulp-confirm');
const rename = require('gulp-rename');
const awspublish = require('gulp-awspublish');
const invalidate = require('gulp-cloudfront-invalidate-aws-publish');
const gulp = require('gulp');
const gutil = require('gulp-util');
const fs = require('fs-extra');
const path = require('path');


module.exports = () => {
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

  return gulp.src('./dist/**/*')
    .pipe(confirm({
      question: `You're about to publish this project to AWS under directory ${awsDirectory}. Are you sure you want to do this?`,
      input: '_key:y',
    }))
    .pipe(rename((path) => {
      path.dirname = awsDirectory + path.dirname.replace('.\\', '');
    }))
    .pipe(publisher.publish(headers, { force: false }))
    .pipe(!!gutil.env.invalidate ? invalidate(cloudFrontConfig) : gutil.noop())
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
};
