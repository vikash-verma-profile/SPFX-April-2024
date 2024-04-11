interface IVehiculo{
    Drive():void;
    Refuel(amount:number):boolean;
}

class Car implements IVehiculo{
    private gasoline:number;
    constructor(gasoline:number){
        this.gasoline=gasoline;
    }

    Drive(): void {
        if(this.gasoline>0){
            console.log("the Car is driving");
        }
        else{
            console.log("the Car has no gasoline to drive");
        }
    }

    Refuel(amount: number): boolean {
        if(amount<=0){
            console.log("Please provide a valid amount of gasoline to refuel");
            return false;
        }
       this.gasoline+=amount;
       console.log(`Refuled ${amount} gallons of gasoline`);
       return true;
    }
}

function main(){
    const startingGasoline=0;
    const car=new Car(startingGasoline);
    const amountToRefuel=10;
    car.Refuel(amountToRefuel);
    car.Drive();
}

main();