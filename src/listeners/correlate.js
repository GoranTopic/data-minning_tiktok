//import testListener from './response.js';
import handlerResponseByContentType from '../correlation/handlerByContentType.js'; 

const correlateRequestFinished = async requestFinished => {
    let response = await requestFinished.response();
    let request = requestFinished;
    handlerResponseByContentType({ request, response })
}

const correlateResponse = response => 
    handlerResponseByContentType({ response });

export { correlateRequestFinished, correlateResponse };
