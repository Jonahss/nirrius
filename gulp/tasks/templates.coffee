gulp       = require("gulp")
jade       = require("gulp-jade")
config     = require("../../config/application")
meta       = require("../../config/meta-attributes")
theme      = require("../../assets/javascripts/resources/theme")
{asset}    = require("../../assets/javascripts/helpers/path")

options =
  pretty: config.ENVIRONMENT is "development"
  locals: {config, asset, meta, theme}

gulp.task "templates", ->
  gulp.src "assets/templates/**/*.jade"
    .pipe jade(options)
    .pipe gulp.dest "build"
