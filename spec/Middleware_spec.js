describe('connect-title', function() {
  var connect_title = require(__dirname + '/../index');

  it('should be and return a function', function() {
    var mw;
    expect(typeof connect_title).toBe('function');

    mw = connect_title();

    expect(typeof mw).toBe('function');
  });

  describe('middleware', function() {
    var mw, env;
    var connect_obj = {req: {}, res: {}, next: null};

    beforeEach(function() {
      var flag = false;
      mw = connect_title();
      env = new jasmine.Env();
      connect_obj.res.locals = {};
    });

    afterEach(function() {
      mw = null;
      connect_obj.req = {};
      connect_obj.res = {};
    });

    it('should add "title" to the response object', function() {
      env.describe('asynchronous middleware', function() {
        env.it('should add "title" to the response object', function(done) {
          mw(connect_obj.req, connect_obj.res, done);
          process.nextTick(function() {
            env.currentSpec.expect(connect_obj.res.title).toBeDefined();
            env.currentSpec.expect(connect_obj.res.locals.title).toBeDefined();
          });
        });
      });

      env.currentRunner().execute();

      waitsFor(function() {
        return env.currentRunner().results().totalCount >= 2;
      }, 1000);

      runs(function() {
        expect(env.currentRunner().results().passedCount).toBe(2);
      });
    });
  });
});
