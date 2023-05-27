import { decode_url } from '../../../utils/url_encoders.js';

// handle json files
const handleJsonReponse = async response => {
    // if response is empty, dont save it
    if( await response.status() === 204 ) return;
    // get the url
    // 
    let url = await response.url();
    // if the url has api in it, save it
    if( !url.includes('api') ){
        //console.log('does not have api in it', url);
        return;
    }
    // get the response
    let json;
    try {
        json = await response.json();
    } catch (error) {
        //console.log('response', response);
        //console.log('error', error);
        return;
    }
    let data = {};
    // if it has a ItemList
    if( json?.itemList )
        data = parse_itemList(json);
    // if it has a comments
    if( json?.comments )
        data = parse_comments(json);
}

const parse_comments = json => {
    // get the comments
    let comments = json.comments;
    // add user and time stamp
    comments = comments.map(comment => {
        // add the user
        comment.timeStamp = extra.now
        // add id
        comment.id = comment.cid;
        // the the sahe id out of the url prameters
        let share_info = comment.share_info.url;
        let post_id = decode_url(share_info).share_item_id;
        // add the video id
        comment.post = post;
        // return the comment
        return comment;
    });
    // return comments
    return { comments };
}

const parse_itemList = json => {
    // get the itemList
    let itemList = json.itemList;
    // scrap item lists
    console.log('got json itemList', itemList.length);
    // let parse the data
    let posts = [];
    let authors = [];
    let videos = [];
    let musicList = [];
    // for each post on the itemList
    itemList.forEach(post => {
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
    //console.log('posts', posts);
    // return the data
    return { posts, authors, videos, music: musicList };
}

export default handleJsonReponse;
