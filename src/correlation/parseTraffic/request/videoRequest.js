// handle videos
const handleVideoRequest = async request => {
    let parsed = {} 
    // get the video url
    let url = request.url();
    parsed['url'] = url;
    // get the request headers
    let headers = request.headers()
    // get the request range
    if (headers['range']) {
        let range = headers['range']
        let start = range.replace(/bytes=/, "").split("-")[0]
        let end = range.split("-")[1] || start + 9999999999
        parsed['range'] = { start, end } 
    }
    //else{
        //console.log('no content-range header in rqeuest')
        //console.log(headers)
    //}
    // parse the range
    return { ...parsed, type: 'blob_video' } 
}

export default handleVideoRequest;
