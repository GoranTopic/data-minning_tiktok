import { firefox } from 'playwright-extra';
import prompt_sync from 'prompt-sync';
// import the scripts to follow
import watch_memes from './scripts/watch_memes.js';
import scrap_user from './scripts/scrap_user.js';
import scrap_hashtag from './scripts/scrap_hashtag.js';
//import extra_stealth from 'puppeteer-extra-plugin-stealth'
// import listeners
import setListeners from './listeners/setListeners.js';
// import routes
import setRouters from './routes/setRoutes.js';
// add stealth plugin and use defaults (all evasion techniques)
//firefox.use(extra_stealth())

const launchOptions = {
    headless: false,
    proxy: {
        server: '222.165.235.2:80'
    }
};

// domain
let domain = 'https://www.tiktok.com/';

// browser
const browser = await firefox.launch(browserOptions);

// create a new page
const page = await browser.newPage();
// set routes to intercept requests and responses
await setRouters(page);
// set listeners to listen to events
await setListeners(page);
// wait for the page to load
await page.waitForLoadState('networkidle', { timeout: 1000 * 60 * 60 * 5 });
// scroll down
//await watch_memes(page);
// lets scrap the user 
// some users to test agaist
let users_example = [ 'pelaofili298', 'tucarla15', 'loveney_mar' ];
// scrap the user
await scrap_user(page, users_example[0]);
// scrap the hashtag
let hashtags_example = [ 'movies' ];
// scrap the hashtag
//await scrap_hashtag(page, hashtags_example[0]);
// got to the domain
//await page.goto(domain);
