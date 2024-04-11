 console.log("Hello this is my first program in js");
 var x=1;
 console.log(x);
// alert("Hello I am an alert or toast coming from js code");
function Validate() {
    var Number1 = document.getElementById('txtNumber').value;
    console.log(checkOddOrEven(Number1));
    document.getElementById("lblMessage").innerHTML = checkOddOrEven(Number1);
}

function checkOddOrEven(number) {
    return (number & 1) ? "It is Odd Number" : "It is Even Number";
}
function checkInput() {
    // debugger;
    const txtNumber = document.getElementById('txtNumber').value;
    if (isNaN(txtNumber)) {
        document.getElementById('txtNumber').classList.add('error');
        return false;
    } else {
        document.getElementById('txtNumber').classList.remove('error');
        return true;
    }
}

function ValidateNumber(){
    let Number1 = document.getElementById('txtNumber').value;
    try{
        if(Number1.trim()==="") throw "empty";
        if(isNaN(Number1)) throw "not a number";
        Number1=Number(Number1);
        if(Number1<10) throw "low";
        if(Number1>=10) throw "high"
    }
    catch(err){
        document.getElementById("lblMessage").innerHTML = "Input is "+err;
    }
    finally{
        document.getElementById("txtNumber").innerHTML = "";
    }
   
}