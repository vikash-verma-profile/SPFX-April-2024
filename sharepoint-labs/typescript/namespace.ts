namespace MyNameSpace{
    export class MyClass{
        greet():void{
            console.log("Hello i am from Myclass");
        }
    }
}

const obj=new MyNameSpace.MyClass();
obj.greet();

namespace OuterNameSpace{
    export namespace InnerNameSpace{
        export class NestedClass{
            greet():void{
                console.log("Hello i am from NestedClass");
            }
        }
    }
}

const obj1=new OuterNameSpace.InnerNameSpace.NestedClass();
obj1.greet();