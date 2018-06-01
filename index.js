const metalsmith = require('metalsmith');
const assets = require('metalsmith-assets');
const drafts = require('metalsmith-drafts');
const collections = require('metalsmith-collections');
const ignore = require('metalsmith-ignore');
const markdown = require('metalsmith-markdown');
const discoverPartials = require('metalsmith-discover-partials');
const layouts = require('metalsmith-layouts');

metalsmith(__dirname)
  .metadata({
      title: "AKO"
  })
  
  // Handle all files in /src/content
  .source('./src/content')

  // Build into /build
  .destination('./build')

  // Clean build directory
  .clean(true)

  // Copy assets into /build
  .use(assets({
      source: './src/assets',
      destination: '.'
  }))

  // Ignore drafts
  .use(drafts())

  // Compile archive collection into one single page
  .use(collections({
      archive: {
          pattern: 'archive/*.md',
          sortBy: 'sortkey',
          reverse: true
      }
  }))

  // Apply markdown everywhere
  .use(markdown())

  // Do not generate archive entries, they are compiled into one single page
  .use(ignore('archive/*.html'))

  // Find handlebars partials
  .use(discoverPartials({
    directory: './src/layouts/partials',
    pattern: /\.hbs$/
  }))

  // Apply layouts
  .use(layouts({
    directory: './src/layouts',
    engine: 'handlebars',
    pattern: '*.html'
  }))

  // Run everything.
  .build(function(err, files) {
      if (err) { throw err; }
  });

  // Done.