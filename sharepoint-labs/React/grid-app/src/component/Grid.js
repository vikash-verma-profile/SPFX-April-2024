import React, { useEffect, useState } from 'react';
import GridItem from './GridItem';

function Grid() {

    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()).then(json => setData(json));
    }, [])
    return (<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px' }}>
        {data.map(item => (
            <GridItem key={item.id} item={item} />
        ))}
    </div>);
}

export default Grid;