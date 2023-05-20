import correlator from '../correlation/Correlator.js';

// Scroll and watch videos dynamically
const videoDuration = 5000; // Duration in milliseconds to watch each video
let previousHeight = 0;

const watch_videos = async page => {
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
        await page.waitForTimeout(10000);
        // current 
        current++;
    }
}

export default watch_videos;
