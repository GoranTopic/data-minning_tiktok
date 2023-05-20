import correlator from '../correlation/Correlator.js';


const scrap_user = async (page, user) => {

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
