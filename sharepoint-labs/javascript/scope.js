// function sayWord(word){
// return()=> console.log(word);
// }
// const sayHello=sayWord("Hello");

// sayHello();//hello


//==> blocked Scope
// if(true){
//     const name="name";
//     console.log(name);
// }
// console.log(name);

function sayName(){
    const name="name";
    console.log(name);
}
sayName();
console.log(name);