// add router to intercept the request and change print the reques and response
// thi si used more as an example of how to intercept the request and response
const inptercept = async (route, request) => {
    // Make the original request
       // fetch the request
    let response = await route.fetch()
    // continue with the request, to edit request headers use 
    await route.fulfill({ response })
    // await route.continue() will send another reques the sever
    // await route.continue()
}

export default inptercept;
