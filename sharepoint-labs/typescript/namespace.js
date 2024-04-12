var MyNameSpace;
(function (MyNameSpace) {
    var MyClass = /** @class */ (function () {
        function MyClass() {
        }
        MyClass.prototype.greet = function () {
            console.log("Hello i am from Myclass");
        };
        return MyClass;
    }());
    MyNameSpace.MyClass = MyClass;
})(MyNameSpace || (MyNameSpace = {}));
var obj = new MyNameSpace.MyClass();
obj.greet();
var OuterNameSpace;
(function (OuterNameSpace) {
    var InnerNameSpace;
    (function (InnerNameSpace) {
        var NestedClass = /** @class */ (function () {
            function NestedClass() {
            }
            NestedClass.prototype.greet = function () {
                console.log("Hello i am from NestedClass");
            };
            return NestedClass;
        }());
        InnerNameSpace.NestedClass = NestedClass;
    })(InnerNameSpace = OuterNameSpace.InnerNameSpace || (OuterNameSpace.InnerNameSpace = {}));
})(OuterNameSpace || (OuterNameSpace = {}));
var obj1 = new OuterNameSpace.InnerNameSpace.NestedClass();
obj1.greet();
