//import { firefox } from 'playwright-extra';
import { firefox } from 'playwright';
import prompt_sync from 'prompt-sync';
//import extra_stealth from 'puppeteer-extra-plugin-stealth'
import setListeners from './listeners/setListeners.js';
// import the sript to handle
//import the correlator
import correlator from './correlation/Correlator.js';
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
// set listener for requests and responses
await setListeners(page);
// go to the domain
await page.goto(domain);
// wait for the page to load
await page.waitForLoadState('networkidle', { timeout: 1000 * 60 * 60 * 5 });
// scroll down
//await page.mouse.wheel(0, 100);


