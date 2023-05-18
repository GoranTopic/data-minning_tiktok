// handle images
const handleImage = async response => {
    let parsed = {};
    // wait for the response to finish
    await response.finished();
    // get the response 
    let request = response.request();
    // get the request url
    parsed['url'] = request.url();
    //  get the headers
    let headers = response.headers();
    //if( headers ) console.log('image headers: ', headers);
    let body = await response.body();
    // decode the image
    parsed['image'] = Buffer.from(body, 'base64');
    // return ad type
    return { ...parsed, type: 'image' }
}

export default handleImage;
