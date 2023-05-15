// handle images
const handleImage = async response => {
    //  get the headers
    let headers = response.headers();
    if( headers ){
       // console.log('headers: ', headers);
    }
    let image = await response.body();
    // decode the video
    image = Buffer.from(image, 'base64');
}


export default handleImage;
