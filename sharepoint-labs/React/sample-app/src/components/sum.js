import React, { useState } from "react";

function Sum() {

    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');

    const sum=parseFloat(number1)+parseFloat(number2);

   const handleNumber1Change=(event)=>{
    setNumber1(event.target.value);
   }
   const handleNumber2Change=(event)=>{
    setNumber2(event.target.value);
   }
    return (

        <div style={{padding:"10px 10px 10px 10px" }}>
          Number1<input type="text" value={number1} onChange={handleNumber1Change} placeholder="Enter Number 1" style={{padding:"2px 2px 2px 2px" }}/>
          Number2<input type="text" value={number2} onChange={handleNumber2Change} placeholder="Enter Number 2" style={{padding:"2px 2px 2px 2px" }}/>
            <p>Sum is {sum}</p>

        </div>
    );
}

export default Sum;