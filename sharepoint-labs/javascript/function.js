function sum(Number1,Number2=10){
    console.log(Number1+Number2);
}
sum(1,2);
sum(1)

function sumRest(...args){
    let sum=0;
    for(let arg of args) sum+=arg;
    return sum;
}

console.log(sumRest(1,11,12,12));

function sumArgs(){
    let sum=0;
    for(let i=0;i<arguments.length;i++){
        sum+=arguments[i];
    }
    return sum;
}
console.log(sumArgs(1,11,12,12));

//function constructors

function Person(){
    this.name="Vikash",
    this.age=23;

    this.print= function(){
        console.log("hello");
    }
}
function Person(name,age){
this.name=name;
this.age=age;
}
const person1=new Person('vikash',41);
console.log(person1.age);
// person1.print();