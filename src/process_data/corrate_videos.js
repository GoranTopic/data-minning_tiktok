/* 
 * this script will read a html file from the storage/html folder
 * and it will read the json files from the storage/json folder
 * and it will parse the data.  it will look for the items list that
 * hopefully will correlate video data from the collected request 
 */

// import files-js
import { read_json, read_file, ls_dir, ls_files } from 'files-js';
// import url encoders 
import { encode_url, decode_url } from '../utils/url_encoders.js';

// this where we will store all the colected item posts
let items = {};

// first let read the html file and extact the json data
const path = './storage/html/';
// read htlm files
const html_files = ls_files(path)
    .map( file => read_file(path + file) )
// parse the html file with cheerp
let script_jsons = html_files.map( html => 
    html
    .split('<script id="SIGI_STATE" type="application/json">')[1]
    .split('</script>')[0]
);
// parse jsons
let AppContexts = script_jsons
    .map( json => JSON.parse(json) );
// get he items Modules from the AppContext
AppContexts.forEach( AppContext => 
    // get all the keys from the AppContext.ItemModule
    Object.keys(AppContext.ItemModule) 
    .forEach( key => // add the item to the items object
        items[key] = AppContext.ItemModule[key]
    )
)

// now let ge the items form the json files
const json_path = './storage/json/';
// read json files
const json_files = ls_files(json_path)
// read json files
const json_video_items = json_files
    .map( file => read_json(json_path + file) )
    .filter( json => json.hasOwnProperty('itemList') )
    .map( json => json.itemList )
// let get all the items and added them to the items object
json_video_items.forEach( itemList =>
    itemList.forEach( item =>
        items[item.id] = item
    )
)


// loop through the every key in the items object
let posts = Object.keys(items).map( key => {
    // get the item
    let item = items[key];
    return {
        author: { 
            author: item.author?.uniqueId ? item.author.uniqueId : item.author,
            id: item.author?.id? item.author.id : item.authorId,
            nickname: item.author?.nickname? item.author.nickname : item.nickname,
        },
        description: item.desc,
        video: {
            id: item.video.id,
            playAddr: item.video.playAddr,
            downloadAddr: item.video.downloadAddr,
            bitrateUrls: item.video.bitrateInfo[0].PlayAddr.UrlList
        },
    }
})

//console.log(posts.map(post => post.video))



// switch the store videos table keys and values
let video_table = read_json('./storage/videos_table.json');
let switch_video_table = {};
Object.keys(video_table)
    .forEach(key => {
        if(switch_video_table[video_table[key]]) console.log('url already exists');
        else switch_video_table[video_table[key]] = key
    })

// replace the video_table with the switch_video_table
video_table = switch_video_table


// get all the object keys which is mapped to the urls
let stored_videos = Object.keys(video_table)
    .map(url =>  ({ 
        ...decode_url(url), 
        url,
        filename:  video_table[url].includes('_')?  
        video_table[url].split('_')[0] : video_table[url],
    }) )


// now lets compare the posts with the stored videos
posts = posts.map(post => { // for each post
    // for each stored video
    //...post,
    return {
        files: {
            playAddr: video_table[post.video.playAddr] ? video_table[post.video.playAddr] : null,
            downloadAddr: video_table[post.video.downloadAddr] ? video_table[post.video.downloadAddr] : null,
            bitrateUrls: post.video.bitrateUrls.map(url => video_table[url] ? video_table[url] : null)
        }
    }
})

posts.forEach(post => console.log(post.files.playAddr, post.files.downloadAddr, post.files.bitrateUrls))


//let urlIds = stored_ids.map(url => url.filename)
//console.log(new Set(urlIds));
//console.log(html_files[0])

/*
// for each url check if it is in the html file
urlIds.forEach(urlId => {
    if(html_files[0].includes(urlId)) {
        console.log('found');
    }else{
        //console.log('not found');
    }
})

    //.filter( json => json.hasOwnProperty('itemList') )
    //  return one list with all of the list of items
    //.reduce( (acc, json) => acc.concat(json.itemList), [] )
//  return one list with all of the list of items
/*
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
    
