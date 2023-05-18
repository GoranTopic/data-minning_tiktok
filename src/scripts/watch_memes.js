
// Scroll and watch videos dynamically
  const videoDuration = 5000; // Duration in milliseconds to watch each video
  let previousHeight = 0;

const watch_videos = async page => {
    while (true) {
        // Scroll to the bottom of the page
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        // Wait for new videos to load (you can adjust the waiting time if needed)
        await page.waitForTimeout(2000);

        // Find and watch the new videos
        const videos = await page.$$('[data-testid="video-card"]');

        for (const video of videos) {
            // Scroll to the video element
            await video.scrollIntoViewIfNeeded();

            // Play the video
            await video.click();

            // Wait for the specified duration
            await page.waitForTimeout(videoDuration);

            // Scroll to the next video
            await page.evaluate(() => {
                window.scrollBy(0, window.innerHeight);
            });

            // Wait for a short interval before scrolling to the next video (you can adjust the waiting time if needed)
            await page.waitForTimeout(1000);
        }

        // Check if scrolling has reached the end of the page
        const currentHeight = await page.evaluate(() => document.body.scrollHeight);
        if (currentHeight === previousHeight) {
            break;
        }
        previousHeight = currentHeight;
  }
}

export default watch_videos;
