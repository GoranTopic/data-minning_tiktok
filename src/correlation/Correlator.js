import { decode_url } from './utils/url_encoders.js'
import 
// make a class that keeps track of the correlation between traffic, the intecepted reuqest and responces 
// it takes in the request from the traffic, and it takes a response
// called corraltor, it has an empty constructor.
// json strings and video url strings 
// every time it draws relationships between them and ouput the map of the relationships
//
class Correlator {
    constructor() {
        this.authos = []
        this.posts = []
        this.images = []
        this.videos = []
    }
    // html handlers
    html(request, responce) {
        // this function takes a reques html and the respopnce
        // it parses the html and it looks for the AppContext script where there is jsons 
        // file that has the 9 first post data 
        // it parses the data and create Author, Post, Image, Video objects
        // it keeptrack of them in the internal list
        let html_posts = []
        let script_json = html
            .split('<script id="SIGI_STATE" type="application/json">')[1]
            .split('</script>')[0]
        // parse jsons
        let AppContext = JSON.parse( script_json )
        // get he items Modules from the AppContext
        // get all the keys from the AppContext.ItemModule
        Object.keys(AppContext.ItemModule) 
            .forEach( key => // add the item to the items object
                html_posts.push( this._parse_post(AppContext.ItemModule[key]) )
            )
        // add them to the global posts
        html_posts.forEach( post => this.posts.push(post) )
        // print he number of html posts gotten
        console.log(`html posts added: ${html_posts.length}`)
        console.log(`total posts: ${this.posts.length}`)
    }
    // json handlers
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
        let video_url_raw = video_url;
        video_url = video_url.split('&__vid=TT-vCache')[0]
        let correlated = false;
        let selected_post = null;
        // for every post in the video url
        this.posts.forEach( post => {
            // make a video files that will hold the video files
            if(post.video.playAddr === video_url){
                post.files.video['playAddr'] = filename;
                selected_post = post
                correlated = true;
            }
            // add the video files to the post
            if(post.video.downloadAddr === video_url){
                post.files.video['downloadAddr'] = filename;
                selected_post = post
                correlated = true;
            }
            // add the video files to the post
            post.files.video['bitrateUrls'] = 
                post.video.bitrateUrls.map(url => {
                    if(url === video_url){
                        selected_post = post
                        correlated = true;
                        return filename
                    } 
                });
        });
        // add the video files to the post
        if(correlated === false)
            console.log(`could not correlate video file ${filename} to any post`)
        else{
            console.log(`correlated video ${filename} to post by ${selected_post.author.author}`)
            //selected_post.files.video.size += buffer_size;
            // print the size od the video
            //console.log(`${selected_post.files.video.size}/${selected_post.video.size}`)
        }
    }

    }   
}
    // add json
    add_json_posts(json) {
            }

    correalte_video(video_url, video) {

    // add video file 
    add_video_file() {
        
    // _parse a video to standad from
    _parse_post(post) {
        // this funtion takes a post which may not be structured as the same 
        // and return a post with the same structure
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

    // return video 
    get_videos() {
        return this.videos;
    }

    // return posts
    get_posts() {
        return this.posts;
    }

}

// make and instance of the correlator
const correlator = new Correlator()


export default correlator
