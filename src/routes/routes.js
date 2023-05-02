import fs from 'fs';
import handleHtml from './handlers/handleHtml.js';
import handleVideo from './handlers/handleVideo.js';
import handleImage from './handlers/handleImage.js';
import handleJs from './handlers/handleJs.js';
import handleJson from './handlers/handleJson.js';

/* 
 * this file is used to set the routers for the page
 * */

// set the backend domain
let backend_domain = 'https://v16-webapp-prime.us.tiktok.com/';

// set the routers for the page
let setRoutes = async page => {
    // add route to stop from loading images
    // // '**/*.{png,jpg,jpeg,svg}'
    //await page.route('**/*', abortImageRequest);
    // add router to intercept the request and change the hitsPerPage
    await page.route( '**/*', fileSaver);
}

// abort all requests to images 
const abortImageRequest = route => 
    route.request().resourceType() === 'image'
        ? route.abort()
        : route.continue()

// add router to intercept the request and change the hitsPerPage
const inptercept = async (route, request) => {
    // Make the original request
    let url = request.url();
    // get the method
    let method = request.method();
    // get the headers
    let headers = request.headers();
    // get the postData
    let body = request.postData();
    // parse the postData
    //let body_json = JSON.parse(body);
    // continue with the request
    console.log('requests')
    console.log('url: ', url);
    console.log('body: ', body);
    console.log('\n');
    // get body as text 
    //let body_text = await response.text();
    console.log('response: ', response);
    console.log('\n');
    // return response to the page
    //const json = await response.json();
    // fufill the request
    await route.fulfill({ response });
}

const fileSaver = async route => {
    // get the videos
    let resourseType = route.request().resourceType();
    // get the url
    let url = route.request().url();
    // get the response
    let response = await route.fetch()
    //  get the headers
    let headers = response.headers();
    // get the content type
    let contentType = headers['content-type'];
    // handle response based on content type
    if( contentType === 'video/mp4'){
        // save the video with by the request id
        //await handleVideo(route, response, url);
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
    // continue with the request, to edit request headers use 
    await route.fulfill({ response })
    // await route.continue() will send another reques the sever
    //await route.continue()
}

export { setRoutes, abortImageRequest, inptercept }
