//import fs from 'fs';
import getRequestContentType from '../handlers/requests/getRequestContentType.js'
//import getResponseContentType from '../handlers/response/getContentType.js';
//import handleHtml from './handlers/handleHtml.js';
//import handleVideo from './handlers/handleVideo.js';
//import handleImage from './handlers/handleImage.js';
//import handleJs from './handlers/handleJs.js';
//import handleJson from './handlers/handleJson.js';


// this rout takes an traffic, and sepate it the contenct type, 
// it then makes the request and get the response,
// the accodingly send it to the correlator
const correlate = async route => {
    // get the videos
    let request = route.request()
    //  
    let requestContentType = getRequestContentType(request);
    // get the url
    //let url = route.request().url();
    // get the response
    let response = await route.fetch()
    //  get the headers
    /*
    let headers = response.headers();
    // get the content type
    let contentType = headers['content-type'];
    // handle response based on content type
    if( contentType === 'video/mp4'){
        let request_headers = route.request().headers();
        console.log(request_headers);
        // save the video with by the request id
        await handleVideo(route, response, url);
    }else if( contentType === 'application/json' 
        || contentType === 'application/json; charset=utf-8'){
        // save the json by the request id
        await handleJson(route, response, url);
    }else if( contentType === 'image/jpeg'){
        // save the image through the url
        //await handleImage(route, response, url)
    }else if( contentType === 'application/javascript' 
        || contentType === 'application/javascript charset=UTF-8'){
        // save the js code through the url
        //await handleJs(route, response, url)
    }else if( contentType === 'text/html; charset=utf-8'){
        // save the html code through the url
        await handleHtml(route, response, url)
    }else{
        //console.error('content type not handled: ' + contentType);
    }
    */
    // continue with the request, to edit request headers use 
    await route.fulfill({ response })
}

export default correlate;
