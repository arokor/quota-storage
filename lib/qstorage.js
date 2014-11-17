'use strict';


// package module for different environments
function packageModule(global, name, api) {
  if (global.define && global.define.amd) {
    define([], api);
  } else if (typeof exports !== "undefined") {
    module.exports = api;
  } else {
    global[name] = api;
  }
}

function sizeOf(str) {
  // This isn't super correct but will do for our purposes
  return str.length;
}

// QStorage constructor
function QStorage(limit, storage){
  this._limit = limit;
  this._storage = storage;
  this._usage = this._getUsage();
}

// Get current usage
QStorage.prototype._getUsage = function(){
  var usage = 0;
  for(var i=0, len=this._storage.length; i<len; i++) {
    var key = this._storage.key(i);
    usage += sizeOf(key) + sizeOf(this._storage.getItem(key));
  }
  return usage;
};

//
// STORAGE API
// Spec here: http://dev.w3.org/html5/webstorage/#storage-0
//

// Get the key of index idx
QStorage.prototype.key = function(idx){
  return this._storage.key(idx);
};

// Get item for key
QStorage.prototype.getItem = function(key){
  return this._storage.getItem(key);
};

// Set value of key to val
QStorage.prototype.setItem = function(key, val){
  var diff = 0;
  var oldVal = this.getItem(key);
  if(oldVal){
    diff -= (sizeOf(key) + sizeOf(oldVal));
  }
  diff += (sizeOf(key) + sizeOf(val));
  if(this._usage + diff > this._limit){
    throw new Error("Failed to execute 'setItem' on 'Storage': Setting the value of 'test' exceeded the quota.");
  }
  this._usage += diff;
  this._storage.setItem(key, val);
};

// Remove item from storage
QStorage.prototype.removeItem = function(key){
  var oldVal = this.getItem(key);
  if(oldVal){
    this._usage -= (sizeOf(key) + sizeOf(oldVal));
  }
  this._storage.removeItem(key);
};

// Clear storage
QStorage.prototype.clear = function(){
  this._usage = 0;
  this._storage.clear();
};

//
// API
//
var API = {
  createQuota: function(limit, storage){
    return new QStorage(limit, storage);
  }
};

// Module packaging
packageModule(this, 'QStorage', API);
