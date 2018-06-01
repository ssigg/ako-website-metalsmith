const metalsmith = require('metalsmith');
const assets = require('metalsmith-assets');
const drafts = require('metalsmith-drafts');
const collections = require('metalsmith-collections');
const markdown = require('metalsmith-markdown');
const discoverPartials = require('metalsmith-discover-partials');
const layouts = require('metalsmith-layouts');

metalsmith(__dirname)
  .metadata({
      title: "blah blah"
  })
  .source('./src/content')
  .destination('./build')
  .clean(true)
  .use(assets({
      source: './src/assets',
      destination: '.'
  }))
  .use(drafts())
  .use(collections({
      archive: {
          pattern: 'archive/*.md',
          sortBy: 'sortkey',
          reverse: true
      }
  }))
  .use(markdown())
  .use(discoverPartials({
    directory: './src/layouts/partials',
    pattern: /\.hbs$/
  }))
  .use(layouts({
      directory: './src/layouts',
      engine: 'handlebars',
      pattern: '*.html'
  }))
  .build(function(err, files) {
      if (err) { throw err; }
  });