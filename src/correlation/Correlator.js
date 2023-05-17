import { decode_url } from '../utils/url_encoders.js'
import get_video_id_from_url from '../utils/get_video_id_from_url.js';
import { KeyValueStore } from 'crawlee';
import Author from './dataTypes/Author.js'
import Post from './dataTypes/Post.js'
import Image from './dataTypes/Image.js'
import { Video, BlobVideo } from './dataTypes/Video.js'
import Challenge from './dataTypes/Challenge.js'
import Comment from './dataTypes/Comment.js'
import Music from './dataTypes/Music.js'
import Place from './dataTypes/Place.js'

// make a class that keeps track of the correlation between traffic, the intecepted reuqest and responces 
// it takes in the request from the traffic, and it takes a response
// called corraltor, it has an empty constructor.
// json strings and video url strings 
// every time it draws relationships between them and ouput the map of the relationships
class Correlator {
    constructor() {
        (async () => {
            this.dbs = { 
                authors: await KeyValueStore.open('authors'),
                posts: await KeyValueStore.open('posts'),
                images: await KeyValueStore.open('images'),
                videos: await KeyValueStore.open('videos'),
                blob_videos: await KeyValueStore.open('blob_videos'),
                challenges: await KeyValueStore.open('challenges'),
                comments: await KeyValueStore.open('comments'),
                musics: await KeyValueStore.open('musics'),
                places: await KeyValueStore.open('places'),
            }
        })();
        // this is an array to hold the objects
        this.arrays = {
            authors: [],
            posts: [],
            images: [],
            videos: [],
            blob_videos: [],
            challenges: [],
            comments: [],
            musics: [],
            places: []
        }
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
                case 'error':
                    //console.error(`error: ${data.error}`)
                    break;
                default:
                    console.error(`unknown type ${type}`)
            }
        }else{
            // console.log(`adding data to correlator`)
            if(authors)
                for(let author of authors)
                    await this.addAuthor(author)
            if(posts)
                for(let post of posts)
                    await this.addPost(post)
            if(challenges)
                for(let challenge of challenges)
                    await this.addChallenge(challenge)
            if(videos)
                for(let video of videos)
                    await this.addVideo(video)
        }
    }

    // add author 
    addAuthor = async author_data => {
        //console.log(`adding author ${author.id}`)
        // if author already exists, update it
        let a = await this._checkIDAndUpdateData( 'authors', author_data, Author )
        // add the binary urls to expect
        //this._extractBinarysUrlsToExpect( a );
        // add the the arrays
        this.arrays['authors'].push( a )
        // save the author
        await this.dbs['authors'].setValue( a.id, a.toObj() );
    }

    // add post and correlate
    addPost = async post => {
        //console.log(`adding post ${post.id}`)
        // if post already exists, update it
        let p = await this._checkIDAndUpdateData( 'posts', post, Post )
        // add the the internal array
        this.arrays['posts'].push( p )
        // add the binary urls to expect
        //this._extractBinarysUrlsToExpect( p );
        // save the post
        await this.dbs['posts'].setValue( p.id, p.toObj() )
    }

    // add image and correlate
    addImage = async image_data => {
        // make an image object 
        let i = new Image( image_data )
        //await this.dbs['images'].setValue( image.id, image )
    }

    // add video and correalte
    addVideo = async video_data => {
        // make a video object
        let v = new Video( video_data )
        // get all of the urls from the video 
        this._extractBinarysUrlsToExpect( v );   
        // add the the internal array
        this.arrays['videos'].push( v )
        // if video already exists, update it
        v = await this._checkIDAndUpdateData( 'videos', video_data, Video )
        // save the video in the db
        await this.dbs['videos'].setValue( v.id, v.toObj() )
        /*
        console.log('binaries to expect:', 
            Object.keys(this.binariesToExpect)
            .map( url => { 
                let mapped = {};
                let url_id = get_video_id_from_url(url);
                let post = this.binariesToExpect[url].data.bitrateInfo[1];
                mapped[url_id] = post
                return { ...mapped }
            })
        )
        */
    }

    // correlate video with binary data
    addBlobVideo = async blob_video_data => {
        // print this binaries to expect
        let url = blob_video_data.url;
        // check if it is correlated to a video
        let video = this.binariesToExpect[url].dataObj;
        if(video) // add make blob obj to the video
            video.addBlob( new BlobVideo(blob_video_data) );
        else{
            let video_id = get_video_id_from_url(blob_video_data.url);
            console.log(`blob video ${video_id} could not be correlated`)
        }
    }

    // add comment and correlate
    addComment = async comment => {
    }

    // add music and correlate
    addMusic = async music => {
        await this.musics.setValue( music.id, music )
    }

    addChallenge = async challenge => {
        //console.log(`adding challenge ${challenge.id}`)
        // if challenge already exists, update it
        let c = await this._checkIDAndUpdateData( 'challenges', challenge, Challenge )
        // save the challenge
        await this.dbs['challenges'].setValue( c.id, c.toObj() )
    }

    //  add place and correlate
    addPlace = async place => {
    }

    /* @param {string} arrayType - the type of array to get
     *      @param {string} by - the key to check
     *          @param {string} of - the value it must be equal to
     *  @returns {Array} - the array of objects that match the query
     *  @example corrlator.get('authors').by('id').of('1')
     */
    get = arrayType => ({
        by: by => ({
            of: of => this.arrays[arrayType].filter( obj => obj.data[by] === of )
        })
    })


    /* @param {Object} database - the dataset to check the id against, this can be this.authors... etc
     * @param {Object} data - the data to check the id against
     * @param {Class} Class - the class to create if the id does not exist
     * @return {Object} - the object that was created or updated based on the passed class
     * check if the id exists in the database, if it does, update it, if not, create a new one
     */
    _checkIDAndUpdateData = async (type, data , Class) => {
        let d;
        let id = data.id;
        // if author already exists, update it
        let previous_record = await this.dbs[type].getValue( id );
        if( previous_record ){
            d = new Class( previous_record )
            console.log('updating previous_record, ', previous_record.id + ' with ' + data.id);
            d.update( data )
        }else // else create a new author
            d = new Class( data )
        return d;
    }
    /* @param {Object} js obj 
     * @return null
     * get all of the urls from the video and add them to the expected binary data
     */
    _extractBinarysUrlsToExpect = dataObj => {
        let data = dataObj.toObj();
        /* this function takes an object and returns an array of all of the urls in the object */
        let _findUrlsValues = (obj, path = '', results = []) => {
            const urlRegexPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:\d{2,5})?(\/\S*)?$/i;
            for (let key in obj) {
                const value = obj[key];
                const newPath = path ? `${path}.${key}` : key;
                if (typeof value === 'string' && urlRegexPattern.test(value)) {
                    results.push({ path: newPath, value });
                } else if (typeof value === 'object') {
                    _findUrlsValues(value, newPath, results); // Recursive call if the value is an object
                }
            }
            return results;
        }
        // add urls
        let urls = _findUrlsValues(data);
        // add url to expected binary data
        urls.forEach( 
            url => this.binariesToExpect[url.value] = { path: url.path, dataObj }
        );
    }
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

// make and instance of the correlator
const correlator = new Correlator();

export default correlator
