var url=require('url');
var someAdr='http://localhost:8080/sample.html?year=19080&month=sep'
var querystring=url.parse(someAdr,true);
console.log(querystring.host);
console.log(querystring.search);