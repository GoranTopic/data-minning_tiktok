// handle videos
const handleVideoResponse = async response => {
    let parsed = {};
    // get the video
    let video = await response.body();
    parsed['video'] = video;
    // let url
    //let url = response.url();
    //parsed['url'] = url;
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
        console.log(`response content-range: ${start}-${end}, length: ${length}`)
    }video
    //else{=
    //    console.log('no content-range header in response')
    //    console.log(headers)
    //}
    if(headers['content-length']){video
        // get the content-length header
        let length = headers['content-length'];
        parsed['length'] = length;
        console.log(`content-length: ${length}`)
    }
    //else{
    //    console.log('no content-length header in response')
    //    console.log(headers)
    //}
    return { ...parsed, type: 'blob_video' };
    //  get the request id
    // add the url to the request id in the videos table
    // don't use url as it appears not to be the unique
    //video_table[url] = request_id;

    // get the video size in bytes
    //let video_size = video.byteLength;
    // decode from base64
    //video = Buffer.from(video, 'base64');
    //write_binary(video, `./storage/videos/${request_id}`);
    // get the filename
    //let filename = url.split('/').slice(-2)[0]
    // add to correlator
    //correlator.add_video_file(url, filename, video);
    // save the videos table
    //write_json(video_table, `./storage/videos_table.json`);
    //console.log(`saved ./storage/videos/${request_id}`);
    /*
    //  get the request id
    let video_url_raw = video_url;
    video_url = video_url.split('&__vid=TT-vCache')[0]
    let correlated = false;
    let selected_post = null;
    // for every post in the video url
    this.posts.forEach( post => {
        // make a video files that will hold the video files
        if(post.video.playAddr === video_url){
            post.files.video['playAddr'] = filename;
            selected_post = post
            correlated = true;
        }
        // add the video files to the post
        if(post.video.downloadAddr === video_url){
            post.files.video['downloadAddr'] = filename;
            selected_post = post
            correlated = true;
        }
        // add the video files to the post
        post.files.video['bitrateUrls'] = 
            post.video.bitrateUrls.map(url => {
                if(url === video_url){
                    selected_post = post
                    correlated = true;
                    return filename
                } 
            });
    });
    // add the video files to the post
    if(correlated === false)
        console.log(`could not correlate video file ${filename} to any post`)
    else{
        console.log(`correlated video ${filename} to post by ${selected_post.author.author}`)
        //selected_post.files.video.size += buffer_size;
        // print the size od the video
        //console.log(`${selected_post.files.video.size}/${selected_post.video.size}`)
    }
    */
}

export default handleVideoResponse;
