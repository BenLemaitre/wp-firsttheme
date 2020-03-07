import gulp from "gulp";
import yargs from "yargs";
import sass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import gulpif from "gulp-if";
import sourcemaps from "gulp-sourcemaps";
import imagemin from "gulp-imagemin";
import del from "del";

const PROD = yargs.argv.prod;

const paths = {
  styles: {
    src: ["src/assets/scss/bundle.scss", "src/assets/scss/admin.scss"],
    dest: "dist/assets/css"
  },
  images: {
    src: "src/assets/images/**/*.{jpg,jpeg,png,svg,gif}",
    dest: "dist/assets/images"
  },
  others: {
    src: [
      "src/assets/**/*",
      "!src/assets/{images,js,scss}",
      "!src/assets/{images,js,scss}/**/*"
    ],
    dest: "dist/assets"
  }
};

export const clean = () => del(["dist"]);

export const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(gulpif(!PROD, sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpif(PROD, cleanCSS({ compatibility: "ie8" })))
    .pipe(gulpif(!PROD, sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dest));
};

export const images = () => {
  return gulp
    .src(paths.images.src)
    .pipe(gulpif(PROD, imagemin()))
    .pipe(gulp.dest(paths.images.dest));
};

export const copy = () => {
  return gulp.src(paths.others.src).pipe(gulp.dest(paths.others.dest));
};

export const watch = () => {
  gulp.watch("src/assets/scss/**.scss", styles);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.others.src, copy);
};

export const dev = gulp.series(
  clean,
  gulp.parallel(styles, images, copy),
  watch
);

export const build = gulp.series(clean, gulp.parallel(styles, images, copy));

export default dev;
