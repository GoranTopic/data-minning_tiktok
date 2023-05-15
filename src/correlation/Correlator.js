import { decode_url } from '../utils/url_encoders.js'
import { KeyValueStore } from 'crawlee';
import Author from '../dataTypes/Author.js'
import Post from '../dataTypes/Post.js'
import Image from '../dataTypes/Image.js'
import { Video, BlobVideo } from '../dataTypes/Video.js'
import Challenge from '../dataTypes/Challenge.js'
import Comment from '../dataTypes/Comment.js'
import Music from '../dataTypes/Music.js'
import Place from '../dataTypes/Place.js'


// make a class that keeps track of the correlation between traffic, the intecepted reuqest and responces 
// it takes in the request from the traffic, and it takes a response
// called corraltor, it has an empty constructor.
// json strings and video url strings 
// every time it draws relationships between them and ouput the map of the relationships
class Correlator {
    constructor() {
        (async () =>{
            this.authors = await KeyValueStore.open('authors');
            this.posts = await KeyValueStore.open('posts');
            this.images = await KeyValueStore.open('images');
            this.videos = await KeyValueStore.open('videos');
            this.blob_videos = await KeyValueStore.open('blob_videos');
            this.challenges = await KeyValueStore.open('challenges');
            this.comments = await KeyValueStore.open('comments');
            this.musics = await KeyValueStore.open('musics');
            this.places = await KeyValueStore.open('places');
        })();
        // this is an obje to expect
        this.binariesToExpect = {};
    }
    /* 
     * this function takes the author, post, image, video, blob_video, comment, music
     * and tries to correalte between them and previous ones
     * @param {Array} Authos - list of author objects
     * @param {Array} Posts - list of post objects
     * @param {Array} Images - list of image objects
     * @param {Array} Videos - list of video objects
     * @param {Array} BlobVideos - list of blob video objects
     * @param {Array} Comments - list of comment objects
     * @param {Array} Music - list of music objects
     * @return {void} - nothing
     */
    add_data = async data => {
        // get paramters from the passed data
        let { authors, posts, challenges, images, videos, blob_videos, comments, music, places, type } = data;
        if(type){ // if a type is tag is passed, then add the data to the correlator
            switch(type){
                case 'author':
                    await this.addAuthor( data )
                    break;
                case 'post':
                    await this.addPost( data )
                    break;
                case 'challenge':
                    await this.addChallenge( data )
                    break;
                case 'image':
                    await this.addImage( data )
                    break;
                case 'video':
                    await this.addVideo( data )
                    break;
                case 'blob_video':
                    await this.addBlobVideo( data )
                    break;
                case 'comment':
                    await this.addComment( data )
                    break;
                case 'music':
                    await this.addMusic( data )
                    break;
                case 'place':
                    await this.addPlace( data )
                    break;
                default:
                    console.error(`unknown type ${type}`)
            }
        }else{
            // console.log(`adding data to correlator`)
            if(authors)     for(let author of authors)        await this.addAuthor(author)
            if(posts)       for(let post of posts)            await this.addPost(post)
            if(challenges)  for(let challenge of challenges)  await this.addChallenge(challenge)
            if(videos)      for(let video of videos)          await this.addVideo(video)
        }
    }
    // add author 
    addAuthor = async author => {
        console.log(`adding author ${author.id}`)
        // if author already exists, update it
        let a = await this._checkIDAndUpdate( this.authors, author, Author )
        // save the author
        await this.authors.setValue( a.id, a.toObj() )
    }
    // add post and correlate
    addPost = async post => {
        console.log(`adding post ${post.id}`)
        // if post already exists, update it
        let p = await this._checkIDAndUpdate( this.posts, post, Post )
        // save the post
        await this.posts.setValue( p.id, p.toObj() )
    }
    // add image and correlate
    addImage = async image => {
        await this.images.setValue( image.id, image )
    }
    // add video and correalte
    addVideo = async video => {
        console.log(`adding video ${video.id}`)
        // make a video object
        let v = new Video( video )
        // add url to expected binary data
        this.binariesToExpect[v.url] = v
        // if video already exists, update it
        v = await this._checkIDAndUpdate( this.videos, video, Video )
        // save the video
        await this.videos.setValue( video.id, video )

    }
    // correlate video with binary data
    addBlobVideo = async blob_video => {
        //console.log(`correlating blob_video ${blob_video.url}`)
        // make a blob video object
        if( this.binariesToExpect[blob_video.url] ){
            let video = this.binariesToExpect[blob_video.url]
            // let make blob obj 
            let blob = new BlobVideo({
                blob: blob_video.video, 
                start: blob_video.range.start,
                end: blob_video.range.end,
                length: blob_video.range.length,
                url: blob_video.url })
            video.addBlob( blob )
            console.log('blob video correlated to:', video.id)
        }else{
            console.error('blob video could not be correlated')
        }
    }
    addComment = async comment => {
    }
    addMusic = async music => {
        await this.musics.setValue( music.id, music )
    }
    addChallenge = async challenge => {
        console.log(`adding challenge ${challenge.id}`)
        // if challenge already exists, update it
        let c = await this._checkIDAndUpdate( this.challenges, challenge, Challenge )
        // save the challenge
        await this.challenges.setValue( challenge.id, challenge )
    }
    addPlace = async place => {
    }
    /* @param {Object} database - the dataset to check the id against, this can be this.authors... etc
     * @param {Object} data - the data to check the id against
     * @param {Class} Class - the class to create if the id does not exist
     * @return {Object} - the object that was created or updated based on the passed class
     */
    _checkIDAndUpdate = async (database, data , Class) => {
        let d;
        let id = data.id;
        // if author already exists, update it
        let previous_record = await database.getValue( id );
        if( previous_record ){
            d = new Class( previous_record )
            console.log('updating previous_record, ', previous_record.id + ' with ' + data.id);
            d.update( data )
        }else // else create a new author
            d = new Class( data )
        return d;
    }
    /*
        // html handlers
    json(request, response) {
        // get json
        // if json does not have itemList, dont save it
        let new_json_posts = []
        // check if the json has an itemList array
        if( !json.itemList ) return;
        // let get all the items and added them to the items object
        json.itemList.forEach( item =>
            new_json_posts.push( this._parse_post(item) )
        )
        // add them to the global posts
        new_json_posts.forEach( post => this.posts.push(post) )
        console.log(`json posts added: ${new_json_posts.length}`)
        console.log(`total posts added: ${this.posts.length}`)
    }
// js handlers
    js(request, response) {
    }
// image handlers
    image(request, response) {
    }
// video handlers
    video(request, response) {
        // remove the cache from the video url
            }
// this funtion takes a post which may not be structured as the same 
// and return a post with the same structure
    _parse_post(post) {
        return {
            author: { 
                author: post.author?.uniqueId ? post.author.uniqueId : post.author,
                id: post.author?.id? post.author.id : post.authorId,
                nickname: post.author?.nickname? post.author.nickname : post.nickname,
            },
            description: post.desc,
            video: {
                size: post.video.size,
                id: post.video.id,
                playAddr: post.video.playAddr,
                downloadAddr: post.video.downloadAddr,
                bitrateUrls: post.video.bitrateInfo[0].PlayAddr.UrlList
            },
            files: { // this is where the files will be stored
                video: {
                    size: 0,
                    playAddr: null,
                    downloadAddr: null,
                    bitrateUrls: [],
                }
            },
        }
    }
    */

}

// make and instance of the correlator
const correlator = new Correlator();

export default correlator
