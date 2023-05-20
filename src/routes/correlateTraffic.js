import handleByType from '../correlation/handlerByContentType.js';

/* this routes make takes th erequest, fetches the response and sends the to be correlated */
const correlateTraffic = async route => {
    // make the request
    let request = await route.request()
    // make the request and get the response
    let response = await route.fetch()
    // sent to the correlator
    await handleByType({request, response})
    // continue with the request
    await route.fulfill({ response })
}

export default correlateTraffic;
