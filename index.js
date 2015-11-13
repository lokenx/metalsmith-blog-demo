var Metalsmith = require('metalsmith');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var sass = require('metalsmith-sass');
var helpers = require('metalsmith-register-helpers');
var excerpts = require('metalsmith-better-excerpts');

Metalsmith(__dirname)
  .use(serve({
    port: 3000,
    verbose: true
  }))
  .use(
    watch({
      paths: {
        "${source}/**/*": true,
        "templates/**/*": "**/*.md",
      },
      livereload: true,
    })
  )
  .use(
    markdown({
      "smartypants": true,
	     "gfm": true,
	      "tables": true
   })
  )
  .use(
    permalinks({
      pattern: ':collection/:date/:title',
      date: 'YYYY'
    })
  )
  .use(
    collections({
      posts: {
        sortBy: 'date',
        reverse: true
      }
    })
  )
  .use(
    helpers({
      directory: "./helpers"
    })
  )
  .use(
    excerpts({
      pruneLength: 500
    })
  )
  .use(
    layouts({
      "engine": "handlebars",
      "directory": "./templates",
      "partials": "./templates/partials"
    })
  )
  .use(
    sass({
      outputDir: 'css/'
    })
  )
  .source('src')
  .destination('dist')
  .build(function(err) {
  	if (err) console.error(err);
  })
