import fs from 'fs';

export default mkdirs_from_url = (url, path = './storage/' ) => {
    // remove the https:// from the url
    // make diretories that the file will be saved in
    // remove the last element
    // make the directories
    url = url.replace('https://', '');
    // make diretories that the file will be saved in
    let dirs = url.split('/');
    // remove the last element
    dirs.pop();
    // make the directories
    for(let i = 0; i < dirs.length; i++){
        path += dirs[i] + '/';
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
    }
    // return the file path
    return url;
}

