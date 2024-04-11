(function(){

})();

(function(x,y){
console.log(x+y);
})(2,3);

var myNameSpace={};

(function(namespace){
    var privateVar="I am private";
    namespace.publicFunction=function(){
        console.log(privateVar);
    };
})(myNameSpace);

myNameSpace.publicFunction();