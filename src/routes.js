import { write_binary, write_binstr, write_json } from 'files-js';
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
    await page.route( '**/*', saveVideo);
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

const saveVideo = async route => {
    // get the videos
    let resourseType = route.request().resourceType();
    let url = route.request().url();
    // print if resource is media
    // get the method
    let response = await route.fetch()
    // get the headers content-type
    let headers = response.headers();
    let contentType = headers['content-type'];
    let request_id = headers['x-storagegw-request-id'];

    //console.log('contentType: ', contentType);
    if( contentType === 'video/mp4'){
        console.log('contentType: ', contentType);
        //console.log('resposne: ', response);
        // get the video
        let video = await response.body();
        // decode the video
        video = Buffer.from(video, 'base64');
        // save the video
        write_binstr(video, `./storage/videos/${request_id}.mp4`);
        console.log('\n');
    }else if( contentType === 'application/json; charset=utf-8'){
        console.log('contentType: ', contentType);
        console.log('url: ', url);
        // get the json
        try{
            const json = await response.json();
            console.log('json: ', json);
            // save the json
            write_json(json, `./storage/json/${request_id}.json`);
            console.log('\n');
        }catch(e){
            //console.log('error: ', e);
            //console.log('response: ', response);    
        }
    } else if( contentType === 'image/jpeg'){
    } else if( contentType === 'application/javascript'){

    }

    
    await route.fulfill({ response });
    //await route.continue()
}


export { setRoutes, abortImageRequest, inptercept }
