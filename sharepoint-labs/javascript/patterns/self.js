const obj={
    name:"vikash",
    sayName:function(){
        console.log("My name is "+this.name);
    }
};
const boundSayName=obj.sayName.bind(obj);
boundSayName();

//arrow functions

const objNew={
    name:"vikash",
    sayName:function(){
        const innerFunction=()=>{
            console.log("My name is "+this.name);
        }
      innerFunction();
    }
};
objNew.sayName();