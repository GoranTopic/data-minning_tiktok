const getContentType = response => {
    // get the headers
    let headers = response.headers();
    // get the content type
    let contentType = headers['content-type'];
    // return the content type
    return contentType
}
 export default getContentType;
