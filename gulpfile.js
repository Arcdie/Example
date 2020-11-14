const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const clean = require('gulp-clean');
const minify = require('gulp-minify');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');

/* Tasks */

// Dev
gulp.task('watcher', () => {
  gulp
    .watch('./public/scss/**/*.scss')
    .on('change', () => {
      gulp.src('./public/scss/styles.scss')
        .pipe(sass())
        .on('error', notify.onError({
          title: 'SCSS ERROR',
        }))
        .pipe(gulp.dest('./public/build'));
    });

  gulp
    .watch('./public/javascripts/**/*.js')
    .on('change', (file) => {
      let newPath = './';
      let path = file.split('/');
      if (path.length === 1) {
        path = file.split('\\');
        file = file.replace(/\\/g, '/');
      }
      const lpath = path.length;

      for (let i = 0; i < lpath - 1; i += 1) {
        newPath += `${path[i]}/`;
      } newPath = newPath.replace('javascripts', 'build');

      gulp
        .src(file)
        .pipe(minify({
          noSource: true,
          ext: { min: '.min.js' },
        }))
        .pipe(gulp.dest(newPath));
    });
});

// Production
gulp.task('min_css', () => {
  return gulp.src('./public/scss/styles.scss')
    .pipe(sass())
    .pipe(csso())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest('./public/build'));
});

gulp.task('min_js', () => {
  return gulp
    .src('./public/javascripts/**/*.js')
    .pipe(minify({
      noSource: true,
      ext: { min: '.min.js' },
    }))
    .pipe(gulp.dest('./public/build/'));
});

// Production
gulp.task('clean', () => {
  return gulp
    .src('./public/build/*', { read: false })
    .pipe(clean());
});

gulp.task('min_images', () => {
  return gulp
    .src('./public/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/images'));
});

gulp.task('go', gulp.series(
  'clean',

  'min_js',
  'min_css',
  // 'min_images',
));
