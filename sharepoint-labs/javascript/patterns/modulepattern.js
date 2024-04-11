var myModule=(function(){
    var privateVariable='I am private';
    function privateFunction(){
        console.log('This is a private function');
    }

    //public interface

    return{
        publicVariable:'I am public',
        publicFunction:function(){
            console.log('This is a public function');
        },
        getPrivateVariable:function(){
            return privateVariable;
        }
    };
})();

//access a public member

console.log(myModule.publicVariable);
myModule.publicFunction();

console.log(myModule.privateVariable);
myModule.privateFunction();