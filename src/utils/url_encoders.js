// decode url paramtes
const decode_url = (url) => {
    let params = url.split('?')[1].split('&');
    let paramsObj = {};
    params.forEach(param => {
        let [key, value] = param.split('=');
        paramsObj[key] = decodeURIComponent(value)
            .replace('(', '')
            .replace(')', '')
    })
    return paramsObj;
}

// encode url parameters
const encode_url = (domain, params) => {
    let url = `${domain}/search?`;
    Object.keys(params).forEach((key, index) => {
        url += `${key}=${encodeURIComponent(params[key])}`;
        if (index < Object.keys(params).length - 1) {
            url += '&';
        }
    })
    return url;
}

export { encode_url, decode_url }   
