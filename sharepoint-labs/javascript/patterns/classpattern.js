
// ==>  ES6
// class Employee{
//     constructor(name,age){
//         this.name=name;
//         this.age=age;
//     }
//     printData(){
//         console.log(`${this.name} have age ${this.age}`);
//     }
// }

// const Employee1=new Employee("Vikash Verma",43);
// const Employee2=new Employee("Suresh Kumar",51);

// Employee1.printData();
// Employee2.printData();

function Employee(name, age) {
    this.name = name;
    this.age = age;
}
Employee.prototype.printData = function () {
    console.log(`${this.name} have age ${this.age}`);
}

const Employee1 = new Employee("Vikash Verma", 43);
const Employee2 = new Employee("Suresh Kumar", 51);

Employee1.printData();
Employee2.printData();