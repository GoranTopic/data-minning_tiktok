//  a resourceType that if it is an image, abort the request
const abortImageRequest = route => 
    route.request().resourceType() === 'image'
        ? route.abort()
        : route.continue()


export default abortImageRequest
