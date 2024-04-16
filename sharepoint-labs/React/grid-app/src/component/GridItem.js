import React from 'react';

function GridItem({ item }) {
    return (<div style={{ border: '1px solid black', padding: '10px' }}>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
    </div>);
}

export default GridItem;