const testResponseHandler = async response => {
    //  if  repository url comes form the algolia api
    const request = response.request();
    //  if  repository url comes form the algolia api
    const url = request.url();
    console.log(`-> ${request.method()} ${url}`);
    console.log(`${response.status()} <-`);
}

export default testResponseHandler;
