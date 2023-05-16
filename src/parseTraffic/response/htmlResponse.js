// handle html code
const handleHtmlResponse = async response => {
    try {
        // get the text as a response
        let html_src = await response.text();
        // get the past of the hmlt string that has the json obj
        let json_str = html_src
            ?.split('<script id="SIGI_STATE" type="application/json">')[1]
            ?.split('</script>')[0];
        // parse the json obj
        let json = JSON.parse(json_str);
        //console.log(json.ItemList);
        let posts_ids = json.ItemList.foryou.list;
        // get post for each id
        let posts = posts_ids.map(id => json.ItemModule[id]);
        // extract data
        let authors = [];
        let videos = [];
        let music = [];
        let challenges = [];
        // for every post
        posts.forEach(post => {
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
        });
        // return the parsed data
        return {
            authors,
            videos,
            music,
            challenges,
            posts,
        };
    } catch (error) {
        // catch type error
        console.log(error);
        // check if error is type error return 
        if (error instanceof TypeError) {
            let html_src = await response.text();
            // get the past of the hmlt string that has the json obj
            let json_str = html_src
                ?.split('<script id="SIGI_STATE" type="application/json">')[1]
                ?.split('</script>')[0];
            // parse the json obj
            let json = JSON.parse(json_str);
            console.log(json);
        }
        // check if error is syntax error
        if (error instanceof SyntaxError) {
            // get the text as a response
            let html_src = await response.text();
            // get the past of the hmlt string that has the json obj
            console.log(html_src);
            console.error(error);
        }

    }
};

export default handleHtmlResponse;
