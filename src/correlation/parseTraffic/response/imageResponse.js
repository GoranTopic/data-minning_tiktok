// handle images
const handleImage = async response => {
    let parsed = {};
    // wait for the response to finish if we can
    if( response.finished ) await response.finished();
    // get url form the request if we can
    let url = (response.request)? 
        await response.request().url() :
        response.url();
    // get the request url
    parsed['url'] = url;
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
