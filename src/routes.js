import { write_binary, write_binstr, write_json, read_json, file_not_exists } from 'files-js';
import fs from 'fs';
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
    await page.route( '**/*', saveTraffic);
}

// make a directory of videos with url mapped to request id
// if file does not exist, make it
if( file_not_exists('./storage/videos_table.js') ) 
    write_json({}, './storage/videos_table.js');
let videos_table = read_json('./storage/videos_table.js');

// if the directories do not exist, make them
[ 'videos', 'images', 'html', 'json', 'js' ].forEach( dir => {
    if( file_not_exists('./storage/' + dir) ) 
        fs.mkdirSync('./storage/' + dir);
});


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

// handle videos
const handleVideo = async (route, response, url) => {
    //  get the headers
    let headers = response.headers();
    //  get the request id
    let request_id = headers['x-storagegw-request-id'];
    // add the url to the request id in the videos table
    videos_table[request_id] = url;
    // get the video
    let video = await response.body();
    // decode the video
    video = Buffer.from(video, 'base64');
    // save the video
    write_binary(video, `./storage/videos/${request_id}`);
    // save the videos table
    write_json(videos_table, './storage/videos_table.js');
    console.log(`saved ./storage/videos/${request_id}`);
}

// handle images
const handleImage = async (route, response, url) => {
    //  get the headers
    let headers = response.headers();
    //  get the request id
    let request_id = headers['x-storagegw-request-id'];
    // get the image
    let image = await response.body();
    // decode the video
    image = Buffer.from(image, 'base64');
    // make the directories
    let file_path = _makeDirs(url, './storage/images/');
    // save the video
    write_binary(image, `./storage/images/${file_path}`);
    console.log(`saved ./storage/images/${file_path}`);
}


// handle json files
const handleJson = async (route, response, url) => {
    //  get the headers
    // if response is empty, dont save it
    if( await response.status() === 204 ) return;
    // get the response
    const json = await response.json();
    // make the directories
    let file_path = _makeDirs(url, './storage/json/');
    // save the json
    write_json(json, `./storage/json/${file_path}`);
    console.log(`saved ./storage/json/${file_path}`);
}

// handle js code
const handleJs = async (route, response, url) => {
    // get the text
    let js_code = await response.text();
    // make the directories
    let file_path = _makeDirs(url, './storage/js/');
    //  save the js code
    fs.writeFileSync(`./storage/js/${file_path}`, js_code);
    console.log(`saved ./storage/js/'${file_path}`)
}

// handle html code
const handleHtml = async (route, response, url) => {
    // get the text
    let html_code = await response.text();
    // make the directories
    let file_path = _makeDirs(url, './storage/html/');
    // save the html code
    fs.writeFileSync(`./storage/html/${file_path}`, html_code);
    console.log(`saved ./storage/html/${file_path}`)
}

const saveTraffic = async route => {
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
    try{
        if( contentType === 'video/mp4'){
            await handleVideo(route, response, url);
        }else if( contentType === 'application/json; charset=utf-8'){
            // save the json through the url
            await handleJson(route, response, url);
        }else if( contentType === 'image/jpeg'){
            // save the image through the url
            await handleImage(route, response, url)
        }else if( contentType === 'application/javascript' 
            || contentType === 'application/javascript charset=UTF-8'){
            // save the js code through the url
            await handleJs(route, response, url)
        }else if( contentType === 'text/html; charset=utf-8'){
            // save the html code through the url
            await handleJs(route, response, url)
        }else
            console.error('content type not handled: ' + contentType);
    
    }catch(err){
        console.log(err);
        console.log('response: ', response);
    }
    // continue with the request, to edit request headers use route.fulfill({ response })
    await route.continue()
}

const _makeDirs = (url, path = './storage/' ) => {
    // remove the https:// from the url
    // make diretories that the file will be saved in
    // remove the last element
    // make the directories
    url = url.replace('https://', '');
    // make diretories that the file will be saved in
    let dirs = url.split('/');
    // remove the last element
    dirs.pop();
    // make the directories
    for(let i = 0; i < dirs.length; i++){
        path += dirs[i] + '/';
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
    }
    // return the file path
    return url;
}


export { setRoutes, abortImageRequest, inptercept }
