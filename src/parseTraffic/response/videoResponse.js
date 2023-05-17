// handle videos
const handleVideoResponse = async response => {
    let parsed = {};
    // wait for the response to finish
    await response.finished();
    // get the video
    let request = response.request();
    // get the request url
    parsed['url'] = request.url();
    // get the video Buffer
    let video = await response.body();
    // get the video
    parsed['video'] = video;
    // get the headers 
    let headers = response.headers();
    if(headers['content-range']){
        let range = headers['content-range'];
        // get the content-range header
        let start = range.replace(/bytes /, "").split("-")[0]
        let end = range.replace(/bytes /, "").split("-")[1].split("/")[0]
        // get the content-length header
        let length = headers['content-length'];
        parsed['range'] = { start, end, length };
    }
    // get the content-length header in case the content-range header is not present
    if(headers['content-length']){video
        // get the content-length header
        let length = headers['content-length'];
        parsed['length'] = length;
        //console.log(`content-length: ${length}`)
    }
    // return the parsed video
    return { ...parsed, type: 'blob_video' };
}

export default handleVideoResponse;
