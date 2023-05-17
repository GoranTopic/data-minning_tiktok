// handle images
const handleImage = async response => {
    // wait for the response to finish
    await response.finished();
    //  get the headers
    let headers = response.headers();
    if( headers ) console.log('image headers: ', headers);
    //  
    let image = await response.body();
    console.log('image:', image);
    // decode the video
    image = Buffer.from(image, 'base64');
    // return ad type
    return { image, type: 'image' }
}


export default handleImage;
