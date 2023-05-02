import { write_json, write_binary, read_json, file_not_exists, file_exists } from 'files-js';
import fs from 'fs';

// if the directories do not exist, make them
if( file_not_exists('./storage/images') )
    fs.mkdirSync('./storage/images');

// make an obj to map every file with it url
// if file does not exist, make it
if( file_not_exists(`./storage/images_table.json`) )
    write_json({}, `./storage/images_table.json`);
// read the images table
 let images_table = read_json(`./storage/images_table.json`);

// handle images
const handleImage = async (route, response, url) => {
    //  get the headers
    let headers = response.headers();
    //  get the request id
    let request_id = headers['x-tt-logid'];
    //  if request id is undefined, throw error
    if( !request_id ){
        console.log('headers: ', headers);
        throw new Error('request id is undefined');
    }
    // if file exists, throw error
    if( file_exists(`./storage/images/${request_id}`) ){
        console.error('image file already exists');
        // add the data to the request id in the images table
        request_id = `${request_id}_${Date.now()}`;
    }
    
    // add the url to the request id in the images table
    images_table[url] = request_id;
    // get the image
    let image = await response.body();
    // decode the video
    image = Buffer.from(image, 'base64');
    // save the video
    write_binary(image, `./storage/images/${request_id}`);
    // save the images table
    write_json(images_table, `./storage/images_table.json`);
    console.log(`saved ./storage/images/${request_id}`);
}


export default handleImage;
