'use strict'

const gulp = require('gulp')
const standard = require('gulp-standard')

const standardOptions = {
  breakOnError: true,
  quiet: true
}

gulp.task('test', _ => {
  return gulp
    .src(['index.js', 'lib/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', standardOptions))
})
