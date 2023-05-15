import { firefox } from 'playwright-extra';
import prompt_sync from 'prompt-sync';
//import extra_stealth from 'puppeteer-extra-plugin-stealth'
import setRoutes from './routes/setRoutes.js';
// create a prompt
let prompt = prompt_sync();
// add stealth plugin and use defaults (all evasion techniques)
//firefox.use(extra_stealth())
import fs from 'fs';

// domain
let domain = 'https://www.reddit.com/'

// browser
const browser = await firefox.launch({
    headless: false,
    // open devtools
    //devtools: true,
});

// set the headers
let setHeaders = async page =>
    await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
    });

// create a new page
const page = await browser.newPage();
// set the headers
await setHeaders(page);
// set routes
await page.route('**', async (route, request) => {
    const response = await route.fetch();
    console.log('method', request.method(), 'status', response.status())
    await route.fulfill({ response });
});
// go to the domain
await page.goto(domain);
// wait for the page to load
await page.waitForLoadState('networkidle', { timeout: 1000 * 60 * 60 * 5 });
// scroll down
await page.mouse.wheel(0, 100);


