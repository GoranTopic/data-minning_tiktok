import { write_json, write_binary, read_json, file_not_exists, file_exists } from 'files-js';
import get_request_id from '../../utils/get_request_id.js';
import fs from 'fs';

// if the directories do not exist, make them
if( file_not_exists('./storage/videos') )
    fs.mkdirSync('./storage/videos');

// make an obj to map every file with it url
// if file does not exist, make it
if( file_not_exists(`./storage/videos_table.json`) )
    write_json({}, `./storage/videos_table.json`);
let video_table = read_json(`./storage/videos_table.json`);

// handle videos
const handleVideo = async (route, response, url) => {
    //  get the request id
    let request_id = get_request_id(
        response, 
        { by: 'filename', path:'./storage/videos/' }
    );
    // add the url to the request id in the videos table
    video_table[request_id] = url;
    // get the video
    let video = await response.body();
    // decode the video
    video = Buffer.from(video, 'base64');
    // save the video
    write_binary(video, `./storage/videos/${request_id}`);
    // save the videos table
    write_json(video_table, `./storage/videos_table.json`);
    console.log(`saved ./storage/videos/${request_id}`);
}

export default handleVideo;
