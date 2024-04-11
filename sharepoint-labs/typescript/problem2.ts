class Person {
    protected age: number = 0;
    Greet(): void {
        console.log("Hello");
    }
    SetAge(age: number): void {
        this.age = age;
    }
}
class Student extends Person {
    Study(): void {
        console.log("I am studying");
    }
    ShowAge():void{
        console.log(`My age is : ${this.age} years old`);
    }
}
class Teacher extends Person {
    Explain():void{
        console.log("I am explaining");
    }
}
function main(){
const person=new Person();
person.Greet();
const student=new Student();
student.SetAge(20);
student.Greet();
student.ShowAge();
student.Study();

const teacher=new Teacher();
teacher.SetAge(56);
teacher.Greet();
teacher.Explain();
}
main();