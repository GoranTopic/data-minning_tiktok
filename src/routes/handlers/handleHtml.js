import { write_json, file_not_exists, read_json, file_exists } from 'files-js';
import get_request_id from '../../utils/get_request_id.js';
import correlator from '../../correlator.js';
import fs from 'fs';
/* this  file handle the html reponses */

// if the directories do not exist, make them
if( file_not_exists('./storage/html') )
    fs.mkdirSync('./storage/html');

// make an obj to map every file with it url
// if file does not exist, make it
if( file_not_exists(`./storage/html_table.json`) )
    write_json({}, `./storage/html_table.json`);
let html_table = read_json(`./storage/html_table.json`);


// handle html code
const handleHtml = async (route, response, url) => {
    //  get the request id
    let request_id = get_request_id(
        response, 
        { by: 'x-akamai-request-id',  path:'./storage/html/' }

    );
    html_table[url] = request_id;
    // get the text
    let html_src = await response.text();
    // add the html to the correlator
    correlator.add_html_posts(html_src);
    // save the html code
    fs.writeFileSync(`./storage/html/${request_id}`, html_src);
    // save the html table
    write_json(html_table, `./storage/html_table.json`);
    //console.log(`saved ./storage/html/${request_id}`)
}

export default handleHtml;
