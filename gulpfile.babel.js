import gulp from "gulp";
import yargs from "yargs";
import sass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import gulpif from "gulp-if";
import sourcemaps from "gulp-sourcemaps";

const PROD = yargs.argv.prod;

const paths = {
  styles: {
    src: ["src/assets/scss/bundle.scss", "src/assets/scss/admin.scss"],
    dest: "dist/assets/css"
  }
};

export const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(gulpif(!PROD, sourcemaps.init()))
    .pipe(sass().on("error", sass.logError))
    .pipe(gulpif(PROD, cleanCSS({ compatibility: "ie8" })))
    .pipe(gulpif(!PROD, sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dest));
};

export const watch = () => {
  gulp.watch("src/assets/scss/**.scss", styles);
};
