
// get the hits from the page
let setListener = async page =>
    // Listen for all responses.   
    page.on('response', async response => {
        //  if  repository url comes form the algolia api
        if (response.url().match(/https:\/\/algolia.invaluable.com*/g)) {
            try {
                // get json response
                let res = (await response.json()).results[0];
                // write json to file
                //console.log(res.hits[0]);
                console.log(`inptercept ${res.hits.length} hits out of ${res.nbHits}`);
                // get the current hits
                current_hits = res.hits.length;
                // get the total hits
                total_hits = res.nbHits;
                // make posible filename
                let filename = `./storage/responces/data-${keyword}-${res.queryID}.json`;
                if( file_exists(filename) )
                    filename = `./storage/responces/data-${keyword}-${res.queryID}-${Date.now()}.json`;
                // write the json file
                write_json(res, filename);
                // log the message
                console.log('json file saved');
            } catch (e) {
                console.log('error', e)
            }
        }
    });
