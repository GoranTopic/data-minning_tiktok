//import testListener from './response.js';
import handlerResponseByContentType from '../correlation/handlerByContentType.js'; 
// file only set up the listeners for the page
let setListener = async page => {
    // Listen for all responses.   
    //page.on('response', testListener);
    page.on('response', handlerResponseByContentType);
}

export default setListener;
