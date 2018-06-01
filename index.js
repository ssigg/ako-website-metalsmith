const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');

Metalsmith(__dirname)
  .metadata({
      title: "blah blah"
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(markdown())
  .use(layouts({
      engine: 'handlebars',
      pattern: '*.html'
  }))
  .build(function(err, files) {
      if (err) { throw err; }
  });