import React, { useState } from "react";

function IncrementButton() {

    const [count, setCount] = useState(1);

    const incrementCount = () => {
        setCount(count + 1);
    }

    return (

        <div>
            <p>
                Count :{count}
            </p>
            <button onClick={incrementCount}>Increment</button>

        </div>
    );
}

export default IncrementButton;