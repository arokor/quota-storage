var QStorage = require('../lib/qstorage');
var expect = require('chai').expect;

function createMockStorage(){
  return {
    s:{},
    length: 0,
    getItem: function(key){
      return (key in this.s) ? this.s[key] : null;
    },
    setItem: function(key, val){
      if(!(key in this.s)) this.length++;
      this.s[key] = ''+val;
    },
    removeItem: function(key){
      if(key in this.s) this.length++;
      delete this.s[key];
    },
    key: function(idx){
      return Object.keys(this.s)[idx] || null;
    },
    clear: function(){
      this.length = 0;
      var _this = this;
      Object.keys(this.s).forEach(function(key){
        _this.removeItem(key);
      });
    }
  };
}



describe('qstorage', function(){
  var mockStorage;

  beforeEach(function(){
    mockStorage = createMockStorage();
  });

  it('should work as usual below quota limit', function(){
    var q = QStorage.createQuota(10, mockStorage);
    q.setItem('key', 'val');
    expect(q.getItem('key')).to.equal('val');
  });

  it('should throw error on quota breach', function(){
    var q = QStorage.createQuota(1, mockStorage);
    expect(function(){q.setItem('key', 'val');}).to.throw(Error);
    expect(q.getItem('key')).to.be.null;
  });

  it('should consider both key and value', function(){
    var q = QStorage.createQuota(6, mockStorage);
    q.setItem('key', 'val');
    expect(function(){q.setItem('key', 'val2');}).to.throw(Error);
    expect(q.getItem('key')).to.equal('val');
  });

  it('should free quota on removeItem', function(){
    var q = QStorage.createQuota(8, mockStorage);
    q.setItem('key', 'val');
    expect(function(){q.setItem('key2', 'val2');}).to.throw(Error);
    q.removeItem('key');
    q.setItem('key2', 'val2');
    expect(q.getItem('key2')).to.equal('val2');
  });
  it('should free quota on clear', function(){
    var q = QStorage.createQuota(8, mockStorage);
    q.setItem('key', 'val');
    expect(function(){q.setItem('key2', 'val2');}).to.throw(Error);
    q.clear();
    q.setItem('key2', 'val2');
    expect(q.getItem('key2')).to.equal('val2');
  });
});
