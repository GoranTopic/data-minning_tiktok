//import { firefox } from 'playwright-extra';
import { firefox } from 'playwright';
import prompt_sync from 'prompt-sync';
// import the scripts to follow
import watch_memes from './scripts/watch_memes.js';
import closePopup from './scripts/close_pop_up.js';
//import extra_stealth from 'puppeteer-extra-plugin-stealth'
// import listeners
import setListeners from './listeners/setListeners.js';
// import routes
import setRouters from './routes/setRoutes.js';
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
    //devtools: true,
});

// create a new page
const page = await browser.newPage();
// set routes to intercept requests and responses
await setRouters(page);
// set listeners to listen to events
await setListeners(page);
// go to the domain
await page.goto(domain);
// wait for the page to load
await page.waitForLoadState('networkidle', { timeout: 1000 * 60 * 60 * 5 });
// close the popup
await closePopup(page);
// scroll down
await watch_memes(page);
// lets scrap the user 
//@pelaofili298
//await scrap_user(page, 'pelaofili298');



