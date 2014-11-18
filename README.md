#QuotaStorage

QuotaStorage provides a possibility to set a custom quota for the web storage API
e.g. localStorage. The quota is defined in characters and both keys and values
are used for the calculation. Can be used together with the module
[NSStorage](https://github.com/arokor/nsstorage) to create namespaced storage
instances with individual quotas.

##Usage
    var quotaStorage = QuotaStorage.quotaStorage(10, localStorage);

    quotaStorage.setItem('key', 'val'); // ok 6 chars are now in use
    quotaStorage.setItem('key2', 'val2'); // throws Error

    quotaStorage.getItem('key') // returns 'val'
    quotaStorage.getItem('key2') // returns null

Follow [@AronKornhall](http://twitter.com/AronKornhall) for news and updates
regarding this library.

##Install
Browserify

    npm install quota-storage

Bower

    bower install quota-storage

Global

    download quota-storage.js and include it in your app

##Test
    npm test

##Reference

###createQuota(limit, storage)

Creates a storage instance with a quota limit

__Arguments__
 
    limit    {Number} The quota limit
    storage  {Object} Implementation of the web storage API
             (eg. sessionStorage or localStorage)

    returns an object implementing the web storage API

##License 

(The MIT License)

Copyright (c) 2014 Aron Kornhall <aron@kornhall.se>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
