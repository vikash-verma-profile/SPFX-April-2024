var Car = /** @class */ (function () {
    function Car(gasoline) {
        this.gasoline = gasoline;
    }
    Car.prototype.Drive = function () {
        if (this.gasoline > 0) {
            console.log("the Car is driving");
        }
        else {
            console.log("the Car has no gasoline to drive");
        }
    };
    Car.prototype.Refuel = function (amount) {
        if (amount <= 0) {
            console.log("Please provide a valid amount of gasoline to refuel");
            return false;
        }
        this.gasoline += amount;
        console.log("Refuled ".concat(amount, " gallons of gasoline"));
        return true;
    };
    return Car;
}());
function main() {
    var startingGasoline = 0;
    var car = new Car(startingGasoline);
    var amountToRefuel = 10;
    car.Refuel(amountToRefuel);
    car.Drive();
}
main();
