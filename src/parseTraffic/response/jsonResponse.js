// handle json files
const handleJsonReponse = async response => {
    // if response is empty, dont save it
    if( await response.status() === 204 ) return;
    // if the url has api in it, save it
    if( url.includes('api') ){
        // get the response
        const json = await response.json();
        //console.log(`saved ./storage/json/${request_id}`);
    }
}
    /*
    let video = [];
    //if we find video files
    if(json?.itemList)
        // for each item in itemList
        json.itemList.forEach(item => {
            // video repsonses
            if(item.video?.bitrateInfo[0]?.PlayAddr.UrlList) {
                let urlList = json.itemList[0].video.bitrateInfo[0].PlayAddr.UrlList
                // if video_table has the video
                urlList.forEach(async url => {
                    await page.fetch({ url });
                });
            }
            // 
        });
        */


export default handleJsonReponse;
