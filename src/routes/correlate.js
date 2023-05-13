//import fs from 'fs';
import getResourceType from '../handlers/requests/getResourceType.js';
import getContentType from '../handlers/responses/getContentType.js';
import correlator from '../correlation/Correlator.js';

// correlate based on content type
let correlatorHandler = {
    'application/json': correlator.json,
    'application/json; charset=utf-8': correlator.json,
    'video/mp4': correlator.video,
    'image/jpeg': correlator.image,
    'application/javascript': correlator.js,
    'application/javascript charset=UTF-8': correlator.js,
    'text/html': correlator.html,
    'text/html; charset=utf-8': correlator.html,
}

// this rout takes an traffic, and sepate it the contenct type, 
// it then makes the request and get the response,
// the accodingly send it to the correlator
const correlate = async route => {
    // get the url
    //let url = route.request().url();
    // get the videos
    let request = route.request()
    // get the resource type
    let resourceType = getResourceType(request);
    // get the response
    let response = await route.fetch()
    // get the content type
    let contentType = getContentType(response);
    // correlate based on content type
    if (correlatorHandler[contentType]) 
        correlatorHandler[contentType](request, response)
    //else 
    //  console.error('no correlator for ' + contentType)
    // continue with the request
    await route.fulfill({ response })
}

export default correlate;
