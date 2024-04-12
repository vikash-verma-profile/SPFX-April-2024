var http=require('http');
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'})
    res.end('<br/> Hello I am server');
}).listen(8080);