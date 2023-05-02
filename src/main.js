import { firefox } from 'playwright-extra';
import prompt_sync from 'prompt-sync';
//import extra_stealth from 'puppeteer-extra-plugin-stealth'
import { setRoutes } from './routes/routes.js';
// create a prompt
let prompt = prompt_sync();
// add stealth plugin and use defaults (all evasion techniques)
//firefox.use(extra_stealth())
import fs from 'fs';

// domain
let domain = 'https://www.tiktok.com/';

// browser
const browser = await firefox.launch({
    headless: false,
    // open devtools
    devtools: true,
});

// set the headers
let setHeaders = async page =>
    await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
    });

// get the source code from page from the 
let get_src_page = async page => {
    // reade html file 
    /*
    let local_html = fs.readFileSync('./reverse_engineering/page_source_code.html', 'utf8');
    console.log(local_html);
    let local_script_json = local_html
        .split('<script id="SIGI_STATE" type="application/json">')[1]
        .split('</script>')[0];
    // parse the json
    let local_json = JSON.parse(local_script_json);
    console.log( Object.keys(local_json['ItemModule']));
    console.log( Object.keys(local_json['ItemModule']).length );
    console.log();
    */

    // get the source code
    let src = await page.content();
    // return the source code
    let script_json = src
        .split('<script id="SIGI_STATE" type="application/json">')[1]
        .split('</script>')[0];
    // parse the json
    let json = JSON.parse(script_json);
    // get the video

    //console.log( Object.keys(json['ItemModule']));
    console.log( Object.keys(json['ItemModule']).length );
    // return the source code
    return src;
}

// create a new page
const page = await browser.newPage();
// set the headers
await setHeaders(page);
// set routes
await setRoutes(page);
// go to the domain
await page.goto(domain);
// set an inteval to get the source code
//await get_src_page(page);
// wait for the page to load
await page.waitForLoadState('networkidle', { timeout: 1000 * 60 * 60 * 5 });

