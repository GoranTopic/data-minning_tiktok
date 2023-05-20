import correlateTraffic from './correlateTraffic.js';
import intercept from './intercept.js';
/* 
 * this file is used to set the routers for the page
 */

// set the routers for the page
let setRoutes = async page => {
    // add route to stop from loading images
    // // '**/*.{png,jpg,jpeg,svg}'
    // add router to intercept the request and change the hitsPerPage
    await page.route( '**/*', correlateTraffic);
}

export default setRoutes

