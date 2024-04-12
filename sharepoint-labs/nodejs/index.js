var http=require('http');
var sample=require('./sampleModule');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'})
    res.write("The value from custom module is : <b>"+sample.printName()+"</b>");
    res.end('<br/> Hello I am server');
}).listen(8080);