// this humble function take the request contenty type form the request object
const getContentType = request => {
    // the types 
    let type = request.resourceType();
    // the content type
    console.log(type);
}
 export default getContentType;
