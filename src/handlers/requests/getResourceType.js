// this humble function take the request contenty type form the request object
const getResourceType = request => {
    // the types 
    let resourceType = request.resourceType();
    // the content type
    return resourceType;
}
 export default getResourceType;
