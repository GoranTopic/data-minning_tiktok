/* 
 * this scrip looks for the json file in the ./storage/json and look for a video json. 
 * when found look for the video files and concatinate them into one video file.
 * the new video file will be saved in the ./storage/videos_complete folder.
 */

import { read_json, ls_dir, ls_files } from 'files-js';
// import url encoders 
import { encode_url, decode_url } from '../utils/url_encoders.js';


// dir path
const path = './storage/json/';
// read json files 
const json_video_items = ls_files(path)
    .map( file => read_json(path + file) )
    .filter( json => json.hasOwnProperty('itemList') )
    //  return one list with all of the list of items
    .reduce( (acc, json) => acc.concat(json.itemList), [] )
//  return one list with all of the list of items
let videos = json_video_items
    .map( itemList => itemList.video )
    //.map( itemList => itemList.video.bitrateInfo[0].PlayAddr.UrlList )
// print the lenght of the json files
//console.log(list_of_bitrates.length);
// read all of the keys in the json_table file
//const json_table = read_json('./storage/json_table.json');
// read all of the keys in the video_table file
//console.log(Object.keys(json_table));
// read video json list
const video_table = read_json('./storage/videos_table.json');
// get all the object keys
let stored_urls = Object.keys(video_table)
    .map(url =>  decode_url(url) )

// for each file read the json file
videos.forEach(video => {
    // get the playAddr
    let playAddr = decode_url(video.playAddr);
    // get uri
    let uri = video.bitrateInfo[0].PlayAddr.Uri;
    // get urlkey
    let urlkey = video.bitrateInfo[0].PlayAddr.UrlKey;
    // get urlList
    let urlList = video.bitrateInfo[0].PlayAddr.UrlList;
    // for every url in the urlList
    console.log('uri: ' + uri);
    console.log('urlkey: ' + urlkey);
    urlList.forEach(bitrate_url => {
        //console.log(bitrate_url);
        // if bit rateis the key to the video_table
        let key = 'ft';
        let json_item_params = decode_url(bitrate_url);
        //console.log(params);
        // for every key is the video_table
        for (const url in video_table){
            // get the filename from the url, which should be the second to last part of the url
            let filename = url.split('/').slice(-2)[0];
            // get the params from the url
            let video_table_params = decode_url(url);
            //console.log(json_item_params[key]);
            //console.log(video_table_params[key]);
            //console.log('filename: ' + filename);
            if(json_item_params[key] === video_table_params[key]) {
                console.log('found');
            }
            if(playAddr[key] === video_table_params[key]) {
                console.log('found');
            }
            //console.log('');
        }
        
    })
});
        //console.log(file);
        // for each json file look recusibely for every property
        /*stored_urls.forEach( param => {
        console.log(param.__vid);
            //console.log(file);
        if(file.includes(param.__vid)) { 
            console.log('found'); 
        }
    });
    */

    /*
    if(json?.itemList)
        // for each item in itemList
        json.itemList.forEach(item => {
            if(item.video?.bitrateInfo[0]?.PlayAddr.UrlList) {
                let urlList = json.itemList[0].video.bitrateInfo[0].PlayAddr.UrlList
                //console.log(urlList);
                // if video_table has the video
                urlList.forEach(url => {
                    //console.log(url);
                    //console.log('--------------------------------');
                    console.log(video_table[url]);
                });
            }
        });
    */
//});

/*
    // for each file read the json file and print it 
json_files.forEach(file => {
    // read json file
    // if the json file had itemList 
    const json = read_json(path + file);
    // check if the json file has itemList
    if (json.hasOwnProperty('body')) {
        let body = json['body'];
        // print json file
        //console.log(body);
        // if body is an array
        if(body instanceof Array) 
            body.forEach(item => {
                // check if the item has expoloreList
                //console.log(item);
                if (item.hasOwnProperty('exploreList')) {
                    console.log('has exploreList');
                    console.log(item['exploreList']);
                }
            });
    }
});
*/
    



