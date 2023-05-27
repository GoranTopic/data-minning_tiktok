// handle html code
const handleHtmlResponse = async response => {
    // get the text as a response
    let html_src = await response.text();
    // get all the scripts open tags
    let jsons = extract_json_objs(html_src);
    // get the json that has the AppContext
    jsons = filter_jsons(jsons);
    // parse the data from the jsons
    let data = parse_data_from_jsons(jsons);
    // return the data
    return data;
};

// parse the data from the jsons
const parse_data_from_jsons = jsons => {
    //  data to extract
    let posts = [];
    let authors = [];
    let videos = [];
    let music = [];
    let challenges = [];
    // for every json file
    jsons.forEach(json => {
        // get the posts ids
        // if there is a ItemList
        let AppContext = json?.AppContext;
        let itemsList = json?.ItemList;
        let itemModule = json?.ItemModule;
        // get item list key 
        let itemListKeys = Object.keys(itemsList);
        let moduleItemIds = []
        // for each key 
        for(let key of itemListKeys) // add all the keys to the itemList
            moduleItemIds = [...moduleItemIds, ...itemsList[key].list ];
        // get the module items keys
        let modules = moduleItemIds.map(id => itemModule[id]);
        // for every module
        modules.forEach( post => {
            // get the author
            let author = {
                author: post.author,
                id: post.authorId,
                secId: post.authorSecId,
                avatar: post.avatarThumb,
                nickname: post.nickname,
                followerCount: post.authorStats.followerCount,
                followingCount: post.authorStats.followingCount,
                heart: post.authorStats.heart,
                videoCount: post.authorStats.videoCount,
                diggCount: post.authorStats.diggCount,
            }
            // delete the author from the post
            delete post.author;
            delete post.authorId;
            delete post.authorSecId;
            delete post.avatarThumb;
            delete post.nickname;
            delete post.authorStats;
            // add jus the autho id
            post.author = author.id;
            // save the author
            authors.push(author);
            // get the video
            let video = post.video;
            // overwrite the video
            post.video = video.id;
            // add the post id to the video
            video.post = post.id;
            // add the author name to the video
            video.authorName = author.nickname;
            // add the author id to the video
            video.author = author.id;
            // for debuggin purposes add the post obj to the video
            video.postDesc = post.desc;
            // save the video
            videos.push(video);
            // get the music
            let music_l = post.music;
            // overwrite the music
            post.music = music_l.id;
            // save the music
            music.push(music_l);
            // get the challenges
            let challenges_l = post.challenges
            // overwrite the challenges
            post.challenges = challenges_l.map(challenge => challenge.id);
            // save the challenges
            challenges_l.forEach(challenge => challenges.push(challenge));
            // save the posts
            posts.push(post);
        });
    });
    // return the parsed data
    return {
        authors,
        videos,
        music,
        challenges,
        posts,
    };
}


// get all the jsons that have the AppContext or ItemModule
const filter_jsons = jsons => {
    // now let filter them if they dont have the AppContext
    return jsons?.filter( json =>
        json?.AppContext || 
        json?.ItemModule ||
        json?.ItemList?.foryou?.list
    )
}

// get all json application scripts from html
const extract_json_objs = html_src => {
    // get all the scripts open tags
    let open_tags = html_src
        ?.split('<script');
    // filter all the tags that have the json application type
    open_tags = open_tags
        ?.filter(tag => tag.includes('type="application/json">'))
        ?.map(tag => tag.split('type="application/json">')[1]);
    // match until the close tag
    let contentJson = open_tags
        ?.map(tag => tag.split('</script>')[0]);
    // for every json file
    let jsons = contentJson?.map(json => {
        try{
            let json_obj = JSON.parse(json);
            return json_obj;
        } catch (error) {
            console.error(error);
        }
    });
    // return the jsons
    return jsons;
}

export default handleHtmlResponse;
