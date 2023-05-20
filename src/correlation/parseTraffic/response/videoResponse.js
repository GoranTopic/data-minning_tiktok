import get_video_id_with_url from '../../../utils/get_video_id_from_url.js';

// handle videos
const handleVideoResponse = async response => {
   //console.log('videoResponse.js: was called')
    let parsed = {};
    // get the request url
    if(response.request)
        parsed['url'] = await response.request().url()
    // debugging
    // try to get the video Buffer
    let video;
    try{
        video = await response.body();
    }catch(e){
        // wait for the response to finish
        console.error(e)
        //console.log('status: ', await response.status());
        //console.log('ok: ', response.ok());
        //console.log('await response finished:')
        //await response.finished()
        //console.log('finished')
        //video = await response.body();
        return { error: e, type: 'error' };
    }
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
