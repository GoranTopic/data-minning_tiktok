const printResponse = async response => {
    //  if we we can get a response, use print it
    if (response.request) {
        const request = response.request();
        const url = request.url();
        console.log(`-> ${request.method()} ${url}`);
    }
    console.log(`${response.status()} <-`);
}

export default testResponseHandler;
