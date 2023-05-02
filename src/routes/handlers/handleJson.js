import { write_json, read_json, file_not_exists, file_exists } from 'files-js';
import get_request_id from '../../utils/get_request_id.js';
import fs from 'fs';

// if the directories do not exist, make them
if( file_not_exists('./storage/json') )
    fs.mkdirSync('./storage/json', { recursive: true });

// make an obj to map every file with it url
// if file does not exist, make it
if( file_not_exists(`./storage/json_table.json`) )
    write_json({}, `./storage/json_table.json`);
let json_table = read_json(`./storage/json_table.json`);

// handle json files
const handleJson = async (route, response, url) => {
    // if response is empty, dont save it
    if( await response.status() === 204 ) return;
    //  get the request id
    let request_id = get_request_id(
        response, 
        { by: 'x-tt-logid', path:'./storage/json/' }
    );
    // if request id is undefined, throw error
    if( !request_id ){
        console.log('headers: ', headers);
        throw new Error('request id is undefined');
    }
    // if the url has api in it, save it
    if( url.includes('api') ){
        // add the url to the request id in the json table
        json_table[url] = request_id;
        // get the response
        const json = await response.json();
        console.log('json: ', json);
        // save the json
        write_json(json, `./storage/json/${request_id}`);
        // save the json table
        write_json(json_table, './storage/json_table.json');
        console.log(`saved ./storage/json/${request_id}`);
    }
    /*
    let video = [];
    //if we find video files
    if(json?.itemList)
        // for each item in itemList
        json.itemList.forEach(item => {
            // video repsonses
            if(item.video?.bitrateInfo[0]?.PlayAddr.UrlList) {
                let urlList = json.itemList[0].video.bitrateInfo[0].PlayAddr.UrlList
                // if video_table has the video
                urlList.forEach(async url => {
                    await page.fetch({ url });
                });
            }
            // 
        });
        */
        }


export default handleJson;
