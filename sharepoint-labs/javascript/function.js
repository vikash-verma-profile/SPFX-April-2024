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