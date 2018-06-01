const metalsmith = require('metalsmith');
const assets = require('metalsmith-assets');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const discoverPartials = require('metalsmith-discover-partials');

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