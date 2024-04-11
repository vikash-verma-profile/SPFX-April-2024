function fetchData(callback){

    setTimeout(function(){
        const data={message:"data fetched successfully"};
        callback(data);
    },2000);
}

function handleData(data){
    console.log(data.message);
}

fetchData(handleData);
