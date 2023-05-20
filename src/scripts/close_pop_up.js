const closePopUp = async page => {
    await page.waitForLoadState('networkidle', { timeout: 1000 * 60 * 60 * 5 });
    // scroll down
    // wait until element in page is visible. data-e2e="modal-close-inner-button"
    await page.waitForSelector('[data-e2e="modal-close-inner-button"]', { timeout: 1000 * 60 * 60 * 5 });
    // click on element
    await page.click('[data-e2e="modal-close-inner-button"]');
    //await page.mouse.wheel(0, 100);
}

export default closePopUp;
