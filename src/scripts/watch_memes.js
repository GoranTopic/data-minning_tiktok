import correlator from '../correlation/Correlator.js';
import closePopup from './close_pop_up.js';
import { shortTime } from '../utils/timers.js'

// domain
let domain = 'https://www.tiktok.com';

// Scroll and watch dank tiktok memes
const watch_videos = async page => {
    // Go to the dank memes page
    await page.goto(`${domain}`, { waitUntil: 'networkidle' });
    // Wait for the page to load
    await page.waitForTimeout(shortTime());
    // Close the popup
    await closePopup(page);
    // Scroll and watch videos
    let count = 100;
    let current = 0;
    while (current < count) {
        // Find all elemsnts with the class of data-e2e="recommend-list-item-container"
        const videos = await page.$$('div[data-e2e="recommend-list-item-container"]');
        // remove the first video of the video list
        // Scroll slowly to the video element
        //await videos[current].scrollIntoViewIfNeeded();
        // press arrow down key
        await page.keyboard.press('ArrowDown');
        // wait a while
        console.log(`wating for, ${shortTime()}ms`);
        await page.waitForTimeout(shortTime());
        // current 
        current++;
    }
}

export default watch_videos;
