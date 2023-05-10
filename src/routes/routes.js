import correlate from './correlate.js';
/* 
 * this file is used to set the routers for the page
 * */

// set the backend domain
let backend_domain = 'https://v16-webapp-prime.us.tiktok.com/';

// set the routers for the page
let setRoutes = async page => {
    // add route to stop from loading images
    // // '**/*.{png,jpg,jpeg,svg}'
    // add router to intercept the request and change the hitsPerPage
    await page.route( '**/*', correlate);
}

export { setRoutes }

