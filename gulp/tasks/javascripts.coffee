gulp          = require("gulp")
gulpif        = require("gulp-if")

source        = require("vinyl-source-stream")
buffer        = require("vinyl-buffer")
uglify        = require("gulp-uglify")

browserify    = require("browserify")
watchify      = require("watchify")
es6ify        = require("es6ify");
reactify      = require("reactify");
bundleLogger  = require("../util/bundleLogger")
handleErrors  = require("../util/handleErrors")

{ENVIRONMENT} = require("../../config/application")
isProduction  = ENVIRONMENT is "production"

es6ify.traceurOverrides =
  experimental: true

options =
  extensions: [".jsx"]
  cache: {},
  packageCache: {},

unless isProduction
  # Required for Watchify.
  options.fullPaths = true

b = browserify(es6ify.runtime, options)
  .add("./assets/javascripts/application.jsx")
  .transform(reactify)
  .transform(es6ify.configure(/.jsx/))

bundleAndWatch = ->
  b = watchify(b)
  b.on "update", bundleApp.bind(bundleApp, b)

  bundleApp(b)

bundleApp = (b) ->
  bundleLogger.start()

  b.bundle()
    .on "error", handleErrors
    .on "end", bundleLogger.end
    .pipe(source("application.js"))
    .pipe(gulpif(isProduction, buffer()))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulp.dest("./build/assets"))

gulp.task "javascripts", ->
  method = if global.isWatching
    bundleAndWatch
  else
    bundleApp.bind(bundleApp, b)

  method()
