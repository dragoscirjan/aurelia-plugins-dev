const debug = require('gulp-debug');
const del = require('del');
const copy = require('gulp-copy');
const gulp = require('gulp');
const { series } = require('gulp');

const source = [
  'plugins/aurelia-content-loader/src/**/*.*',
  'plugins/aurelia-content-loader/dist/**/*.*',
  'plugins/aurelia-google-recaptcha/src/**/*.*',
  'plugins/aurelia-google-recaptcha/dist/**/*.*'
];

const dest = 'src/resources/elements';

const cleanDev = () => {
  return del([
    `${dest}/aurelia-content-loader`,
    `${dest}/aurelia-google-recaptcha`
  ]);
};

const clean = () => {
  return del(source);
};

const syncToDev = () => {
  return gulp
    .src(source)
    .pipe(debug())
    .pipe(copy(dest, { prefix: 1 }));
};

const syncFromDev = () => {
  const msource = source.map(s => `${dest}/${s.split('/').slice(1).join('/')}`);
  return gulp
    .src(msource)
    .pipe(debug())
    .pipe(copy('plugins', { prefix: 3 }));
};

gulp.task('clean-dev', cleanDev);

gulp.task('sync-to-dev', series(cleanDev, syncToDev));

gulp.task('clean', clean);

gulp.task('sync-from-dev', series(clean, syncFromDev));

gulp.task('init-dev-env', () => {
  // TODO:
});
