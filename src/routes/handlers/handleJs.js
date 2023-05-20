import { write_json, read_json, file_not_exists, file_exists } from 'files-js';
import fs from 'fs';

// if the directories do not exist, make them
if( file_not_exists('./storage/js') )
    fs.mkdirSync('./storage/js', { recursive: true });

// make an obj to map every file with it url
// if file does not exist, make it
if( file_not_exists(`./storage/js_table.json`) )
    write_json({}, `./storage/js_table.json`);
// read the images table
 let js_table = read_json(`./storage/js_table.json`);

// handle js code
const handleJs = async (route, response, url) => {
    // get headers
    let headers = response.headers();
    // get the request id
    let request_id = headers['x-akamai-request-id'];
    // if file exists, throw error
    if( file_exists(`./storage/js/${request_id}`) ){
        console.error('js file already exists');
        // add date to file name
        request_id = `${request_id}_${Date.now()}`;
    }
    // if request id is undefined, throw error
    if( !request_id ){
        console.log('headers: ', headers);
        throw new Error('request id is undefined');
    }else
        // add the url to the request id in the js table
        js_table[url] = request_id;
    // get the text
    let js_code = await response.text();
    //  save the js code
    fs.writeFileSync(`./storage/js/${request_id}`, js_code);
    // save the js table
    write_json(js_table, `./storage/js_table.json`);
    console.log(`saved ./storage/js/'${request_id}`)
}


export default handleJs;
