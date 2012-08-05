describe('Title', function() {

  var Title = require(__dirname + '/../Title');

  it('should be a function', function() {
    expect(typeof Title).toEqual('function');
  });

  it('should have instance methods', function() {
    expect(Title.prototype.toString).toBeDefined();
    expect(Title.prototype.add).toBeDefined();
    expect(Title.prototype.reset).toBeDefined();
  });

  describe('Instantiation', function() {
    var instance, siteName, separator;

    siteName = 'site name';
    separator = ' :: ';

    beforeEach(function() {
      instance = new Title(siteName, separator);
    });

    afterEach(function() {
      instance = null;
    });

    it('should instantiate with default values', function() {
      var title = new Title();
      expect(title.base).toBeDefined();
      expect(title.sep).toBeDefined();
      expect(title.pieces.length).toEqual(0);
    });

    it('should instantiate with specific values', function() {
      expect(instance.base).toBe(siteName);
      expect(instance.sep).toBe(separator);
    });

    describe('#toString', function() {
      it('should convert to string predictably', function() {
        expect(instance.toString()).toBe(siteName);
        expect('' + instance).toBe(siteName);
      });
    });

    describe('#add', function() {
      it('should be able to add one item', function() {
        instance.add('item');
        expect(instance.pieces.length).toBe(1);
        expect(instance.pieces).toContain('item');
        expect('' + instance).toBe(siteName + separator + 'item');
      });

      it('should be able to add multiple items', function() {
        instance.add('item1', 'item2');
        expect(instance.pieces.length).toBe(2);
        expect(instance.pieces).toContain('item1');
        expect(instance.pieces).toContain('item2');
        expect('' + instance).toBe(siteName + separator + 'item1' + separator + 'item2');
      });
    });

    describe('#reset', function() {
      var newName = 'somethingElse';

      it('should reset to base', function() {
        instance.add('something');
        instance.reset();
        expect(instance.pieces.length).toBe(0);
        expect(instance.pieces).not.toContain('something');
        expect('' + instance).toBe(siteName);
      });

      it('should allow base to be overridden', function() {
        instance.reset(newName);
        expect(instance.base).not.toBe(siteName);
        expect(instance.base).toBe(newName);
        expect('' + instance).toBe(newName);
      });

      it('should allow an override and then add', function() {
        instance.reset(newName).add('extra');
        expect('' + instance).toBe(newName + separator + 'extra');
      });
    });
  });
});
