import { shortTime, longTime } from '../utils/timers.js'

// domain
let domain = 'https://www.tiktok.com';

const scrap_hashtag = async (page, tag) => {
    let tagUrl = domain + /tag/ + `${tag}`;
    console.log(tagUrl);
    // go to user page
    await page.goto(tagUrl, { waitUntil: 'networkidle' });
    // wait for logish time
    await page.waitForTimeout(longTime());
    // get video
    //const videos = await page.$$('div[data-e2e="user-post-item"]');
    //const numVideo = videos.length;
    //const currentVideo = 0;
    // if there is no video
    //if (numVideo === 0) return;
    // click on the first video
    //await videos[currentVideo].click();
    // wait for network to be idle
    //await page.waitForLoadState('networkidle');
    // for every video
    //let nextButton = await page.waitForSelector('[data-e2e="arrow-right"]', 
        //{ timeout: 1000 * 60 * 60 * 5 }
    //);
    // while we have a next button
    /*
    while (nextButton) {
        // wait for shotish time
        await page.waitForTimeout(shortTime());
        // click on the next button
        await page.click('[data-e2e="arrow-right"]');
        // wait for network to be idle
        await page.waitForLoadState('networkidle2');
        // wait for shotish time
        await page.waitForTimeout(shortTime());
        // check is next button is still there
        nextButton = await page.$('[data-e2e="arrow-right"]');
    }
    */
}

export default scrap_hashtag;
