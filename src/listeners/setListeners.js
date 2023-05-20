//import testListener from './response.js';
import { correlateResponse, correlateRequestFinished } from './correlate.js'

// file only set up the listeners for the page
let setListener = async page => {
    // Listen for all responses.   
    //page.on('response', testListener);
    page.on('requestfinished', correlateRequestFinished); 
    // let check out service workers
    //page.on('websocket', data => console.log('websocket', data));
    // let print when there is a worker
    //page.on('worker', data => console.log('worker', data));
}

export default setListener;
