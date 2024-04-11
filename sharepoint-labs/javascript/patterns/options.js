function fetchData(options) {
    const defaultOptions = {
        url: 'https://dummyjson.com/products/1',
        method: 'GET',
        timeout: 5000
    };

    const mergedOptions={...defaultOptions,...options}

    console.log("Fetching data from :",mergedOptions.url);
    console.log("using method :",mergedOptions.method);
    console.log("Timeout set to :",mergedOptions.timeout);
}
fetchData({
    url: 'https://dummyjson.com/products',
    method: 'POST',
});