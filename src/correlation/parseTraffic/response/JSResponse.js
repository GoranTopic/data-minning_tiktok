// handle js code
const handleJSResponse = async response => {
    // get headers
    let headers = response.headers();
    // if file exists, throw error
    let js_code = await response.text();
}

export default handleJSResponse;
