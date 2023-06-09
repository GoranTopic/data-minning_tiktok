//import fs from 'fs';
import getResourceType from './parseTraffic/request/getResourceType.js';
import getContentType from './parseTraffic/response/getContentType.js';
// html handlers
import handleHtmlResponse from './parseTraffic/response/htmlResponse.js';
// json handlers
import handleJsonResponse from './parseTraffic/response/jsonResponse.js';
// video handlers
import handleVideoRequest from './parseTraffic/request/videoRequest.js';
import handleVideoResponse from './parseTraffic/response/videoResponse.js';
// image handlers
import handleImageResponse from './parseTraffic/response/imageResponse.js';
// correlator
import correlator from './Correlator.js';

// correlate based on content type
let trafficHandlers = {
    'text/html': {
        request: null,//handleHtmlRequest,
        response: handleHtmlResponse
    },
    'text/html; charset=utf-8': {
        request:  null, //handleHtmlRequest,
        response: handleHtmlResponse
    },
    'application/json': {
        request: null, //handleJsonRequest,
        response: handleJsonResponse
    },
    'application/json; charset=utf-8': { 
        request: null, //handleJsonRequest,
        response: handleJsonResponse
    },
    'video/mp4': {
        request: handleVideoRequest,
        response: handleVideoResponse
    },
    'image/jpeg': {
        request: null, //handleImageRequest,
        response: handleImageResponse,
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

// function takes a response, it get the request and response
// it takes the content type and calls the correpending parser
// then it calls the correlator
const handlerResponseByContentType = async ({ response, request }) => {
    // if the response is not passed, get the request from the respose
    if (!request && response.request) request = await response.request();
    // get the url
    //let url = route.request().url()
    // get the resource type
    let resourceType = getResourceType(request);
    // get the content type
    let contentType = getContentType(response);
    //console.log('contentType', contentType)
    let data = {}
    // if there is a correlator for the content type
    if (trafficHandlers[contentType]){
        // get handlers 
        let requestHandler = trafficHandlers[contentType]['request']
        let responseHandler = trafficHandlers[contentType]['response']
        // if there is a request handler
        if (requestHandler)  data = { ...data, ...( await requestHandler(request) ) }
        // if there is a response handler
        if (responseHandler) data = { ...data, ...( await responseHandler(response) ) }
        //console.log('data', data)
    } //else console.error('no correlator for ' + contentType)
    // if thre was data parsed, correlate
    // if data is not an empty object
    if (Object.keys(data).length !== 0)
        await correlator.add_data(data)
}

export default handlerResponseByContentType;
