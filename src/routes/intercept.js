// add router to intercept the request and change print the reques and response
// thi si used more as an example of how to intercept the request and response
const inptercept = async (route, request) => {
    // Make the original request
    let url = request.url();
    // get the method
    let method = request.method();
    // get the headers
    let headers = request.headers();
    if( headers['some-token'] === 'token'){
        headers = {
            ...request.headers(),
            //foo: 'foo-value', // set "foo" header
            //bar: undefined, // remove "bar" header
        };
    }
    // get the postData
    let body = request.postData();
    // parse the postData
    let body_json = JSON.parse(body);
    // continue with the request
    console.log('requests')
    console.log('url: ', url);
    console.log('headers: ', headers);
    console.log('body: ', body);
    console.log('\n');
    // fetch the request
    let response = await route.fetch()
    // continue with the request, to edit request headers use 
    await route.fulfill({ response })
    // await route.continue() will send another reques the sever
    // await route.continue()
}

export default inptercept;
