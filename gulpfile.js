'use strict'

const gulp = require('gulp')

require('require-dir')('./gulp')

gulp.task('default', _ => {
  gulp.start('test')
})
