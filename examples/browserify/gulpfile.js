var gulp = require('gulp');
var browserify = require('browserify');
var streamify = require('gulp-streamify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');

var OUTPUT_PATH = '../../build/browserify';
var TMP_FILE_PREFIX = '../../build/browserify_';

gulp.task('build-bundle', function() {
  return browserify('main.js', {output: TMP_FILE_PREFIX + 'main.tmp'})
    .bundle()
    .pipe(source(TMP_FILE_PREFIX + 'main.tmp'))
    .pipe(streamify(uglify()))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest(OUTPUT_PATH));
});

gulp.task('build-worker', function() {
  return browserify('worker.js', {output: TMP_FILE_PREFIX + 'worker.tmp'})
    .bundle()
    .pipe(source(TMP_FILE_PREFIX + 'worker.tmp'))
    .pipe(streamify(uglify({compress:{
      sequences: false // Chrome has issue with the generated code if true
    }})))
    .pipe(rename('pdf.worker.bundle.js'))
    .pipe(gulp.dest(OUTPUT_PATH));
});

gulp.task('build', ['build-bundle', 'build-worker']);
