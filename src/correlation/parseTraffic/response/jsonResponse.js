// handle json files
const handleJsonReponse = async response => {
    // if response is empty, dont save it
    if( await response.status() === 204 ) return;
    // get the url
    let url = await response.url();
    // if the url has api in it, save it
    if( !url.includes('api') ) return;
    // get the response
    const json = await response.json();
    console.log('json', json);
    // if it has a ItemList
    if( !json.itemList ) return 
    // let parse the data
    let posts = [];
    let authors = [];
    let videos = [];
    let musicList = [];
    // for each post on the itemList
    json.itemList.forEach(post => {
        // if the post has a video
        let author = post.author;
        // overwrite the author
        post.author = author.id;
        let video = post.video;
        // for debuggin purposes add the post author and desc
        video.authorName = author.nickname;
        video.postDesc = post.desc;
        // overwrite the video
        post.video = video.id;
        // get the music
        let music = post.music;
        // overwrite the music
        post.music = music.id;
        // push the post
        posts.push(post);
        // push the author
        authors.push(author);
        // push the video
        videos.push(video);
        // push the music
        musicList.push(music);
    });
    console.log('posts', posts);
    // return the data
    return { posts, authors, videos, music: musicList };
}

export default handleJsonReponse;
