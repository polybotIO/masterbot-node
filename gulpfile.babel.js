// Packages
import del from 'del'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import runSequence from 'run-sequence'

const plugins = gulpLoadPlugins()

const paths = {
  js: [
    './**/*.js',
    '!dist/**',
    '!node_modules/**',
    '!./test.js'
  ],
  nonJs: [
    'package.json',
    'polybot-test.json'
  ]
}

// Clean up dist and coverage directory
gulp.task('clean', () =>
  del(['dist/**', '!dist'])
)

// Copy non-js files to dist
gulp.task('copy', () =>
  gulp.src(paths.nonJs)
    .pipe(plugins.newer('dist'))
    .pipe(gulp.dest('dist'))
)

// Compile ES6 to ES5 and copy to dist
gulp.task('babel', () =>
  gulp.src([...paths.js, '!gulpfile.babel.js'], {base: '.'})
    .pipe(plugins.newer('dist'))
    .pipe(plugins.babel())
    .pipe(gulp.dest('dist'))
)

// Default task: clean dist, compile js files and copy non-js files
gulp.task('default', ['clean'], () => {
  runSequence(['copy', 'babel'])
})
