#connect-title

Lightweight title helper for Connect (and Express).

It adds an object to `res.locals.title` (as well as `res.title`) that can be used to generate page titles dynamically.

##Usage

Basic Express usage is as follows.

```javascript
var titleParams = {base: 'my site', sep: ' - '};

app.configure(function() {
  /* ... */
  app.use(require('connect-title')(titleParams));
});
```

Then, in a route definition:

```javascript
app.get('/some_route', function(req, res) {
  res.title.add('extra text');
  res.render('some_route.jade');
});
```

Finally,

```jade
!!! 5
html
  head
    title= title
```

It is more useful when used in combination with [express-namespace](https://github.com/visionmedia/express-namespace "express-namespace"), or with a series of `app.get` / `app.param` callbacks.

##Documentation
Further documentation can be generated by running [docco](http://jashkenas.github.com/docco/ "Docco") in the module directory.

```bash
docco *.js
```
