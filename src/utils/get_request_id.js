import { file_exists } from 'files-js';
    /* this function will return the request id from the response object
     * it takes as paramters the response object and a options object with the following properties:
     * by with the defaul value of 'x-tt-logid' and path with the default value of './storage/'
     * it will chek in the path whether a file with the name of the request id exists
     * if it does, it will add the current timestamp to the request id and return it
     * possible values for by are: 'x-tt-logid', 'x-storagegw-request-id', 'x-tt-request-id'
     */

export default (response, options) => {
    // set the default values for the options object
    const { by = 'x-tt-logid', path = './storage/' } = options;
    // get the request id from the response headers
    let headers = response.headers();
    // request_id will be the value of the header with the name of by
    let request_id = undefined;
    if(by === 'x-tt-logid'){
        request_id = headers['x-tt-logid'] 
    }else if(by === 'x-storagegw-request-id'){
        request_id = headers['x-storagegw-request-id']
    }else if(by === 'x-tt-request-id'){
        request_id = headers['x-tt-request-id']
    }else if(by === 'filename'){
        // get the url from the response object
        const url = response.url();
        // get the request filename from the url
        request_id = url.split('/').slice(-2)[0]
    }else{
        request_id = headers[by]
    }
    // if request_id is undefined, throw error
    if( !request_id ){
        console.error('request id is undefined on the headers with value of by: ', by);
        console.error('headers: ', headers);
    }
    // if file exists, throw error
    if( file_exists(`${path}${request_id}`) ){
        //console.error('headers: ', headers);
        console.error('video file already exists, adding timestamp to request id');
        // add the data to the request id in the videos table
        request_id = `${request_id}_${Date.now()}`;
    }
    return request_id;
}


    
