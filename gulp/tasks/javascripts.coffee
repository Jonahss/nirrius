gulp          = require("gulp")
gulpif        = require("gulp-if")

source        = require("vinyl-source-stream")
buffer        = require("vinyl-buffer")
uglify        = require("gulp-uglify")

browserify    = require("browserify")
watchify      = require("watchify")
to5ify        = require("6to5ify")
bundleLogger  = require("../util/bundleLogger")
handleErrors  = require("../util/handleErrors")

{ENVIRONMENT} = require("../../config/application")
isProduction  = ENVIRONMENT is "production"

options =
  entries: ["./assets/javascripts/application.jsx"]
  extensions: [".jsx"]
  cache: {},
  packageCache: {},

if not isProduction
  # Required for Watchify.
  options.fullPaths = true
  options.debug = true

b = browserify(options)
  .transform(to5ify)

bundleAndWatch = ->
  b = watchify(b)
  b.on "update", bundleApp.bind(bundleApp, b)

  bundleApp(b)

bundleApp = ->
  bundleLogger.start()

  b.bundle()
    .on "error", handleErrors
    .on "end", bundleLogger.end
    .pipe(source("application.js"))
    .pipe(gulpif(isProduction, buffer()))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulp.dest("./build/assets"))

gulp.task "javascripts", ->
  if global.isWatching
    bundleAndWatch()
  else
    bundleApp()

