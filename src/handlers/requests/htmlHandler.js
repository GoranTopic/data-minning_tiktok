/* this file handle the html reponses */

// handle html code
const handleHtmlResponse = async response => {
    // get the text
    let html_src = await response.text();
    // seach for the script taag with the obj
    let script_json = html
        .split('<script id="SIGI_STATE" type="application/json">')[1]
        .split('</script>')[0]
    // return 
    return html_src;
}

export default handleHtml;
