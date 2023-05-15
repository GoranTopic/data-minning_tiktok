//import fs from 'fs';
import getResourceType from '../parseTraffic/request/getResourceType.js';
import getContentType from '../parseTraffic/response/getContentType.js';
// html handlers
import handleHtmlRequest from '../parseTraffic/request/htmlRequest.js'; 
import handleHtmlResponse from '../parseTraffic/response/htmlResponse.js';
// json handlers
import handleJsonRequest from '../parseTraffic/request/jsonRequest.js';
import handleJsonResponse from '../parseTraffic/response/jsonResponse.js';
// video handlers
import handleVideoRequest from '../parseTraffic/request/videoRequest.js';
import handleVideoResponse from '../parseTraffic/response/videoResponse.js';
// image handlers
import handleImageRequest from '../parseTraffic/request/imageRequest.js';
import handleImageResponse from '../parseTraffic/response/imageResponse.js';
// correlator
import correlator from '../correlation/Correlator.js';

// correlate based on content type
let trafficHandlers = {
    'text/html': {
        request: handleHtmlRequest,
        response: handleHtmlResponse
    },
    'text/html; charset=utf-8': {
        request: handleHtmlRequest,
        response: handleHtmlResponse
    },
    'application/json': {
        request: null, //handleJsonRequest,
        response: null, //handleJsonResponse
    },
    'application/json; charset=utf-8': { 
        request: null, //handleJsonRequest,
        response: null, //handleJsonResponse
    },
    'video/mp4': {
        request: handleVideoRequest,
        response: handleVideoResponse
    },
    'image/jpeg': {
        request: null, //handleImageRequest,
        response: null, //handleImageResponse
    },
    'application/javascript': {
        request: null,
        response: null,
    },
    'application/javascript charset=UTF-8': {
        request: null,
        response: null,
    }
}

// this rout takes an traffic, and sepate it the contenct type, 
// it then makes the request and get the response,
// the accodingly send it to the correlator
const correlateTraffic = async route => {
    // get the url
    //let url = route.request().url();
    // get the videos
    let request = await route.request()
    // get the resource type
    //let resourceType = getResourceType(request);
    // get the response
    let response = await route.fetch()
    // get the content type
    let contentType = getContentType(response);
    // data to parse
    console.log('contentType', contentType)
    let data = {}
    // if there is a correlator for the content type
    if (trafficHandlers[contentType]){
        // get handlers 
        let requestHandler = trafficHandlers[contentType]['request']
        let responseHandler = trafficHandlers[contentType]['response']
        // get correlator
        let correlatorHandler = correlator[contentType]
        // if there is a request handler
        if (requestHandler)  data = { ...data, ...( await requestHandler(request) ) }
        // if there is a response handler
        if (responseHandler) data = { ...data, ...( await responseHandler(response) ) }
        //console.log('data', data)
    }
    //else 
    //  console.error('no correlator for ' + contentType)
    // if thre was data parsed, correlate
    // if data is not an empty object
    if (Object.keys(data).length !== 0)
        await correlator.add_data(data)
    // continue with the request
    await route.fulfill({ response })
}

export default correlateTraffic;
