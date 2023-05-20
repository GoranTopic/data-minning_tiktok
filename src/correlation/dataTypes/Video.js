import DataType from "./DataType.js";
import { v4 as uuidv4 } from 'uuid';
import video_id_from_url from '../../utils/get_video_id_from_url.js';

class Video extends DataType {
    constructor(video) {
        super(video);
        // binary blob video to hold
        this.blobs = [];
        // chooses one of the urls
        this.url = this.data.playAddr ?? this.data.downloadAddr;
        this.urls = [ this.data.playAddr, this.data.downloadAddr ];
        // add then just tin case
        this.playAddr = this.data.playAddr;
        this.downloadAddr = this.data.downloadAddr;
        // the the lenght of the video
        this.size = this.data.size;
        // check if video is done with the blobs
        this.isDone = false;
    }

    addBlob(blob) {
        this.blobs.push(blob);
        console.log('adding blob to video from ', this.data.authorName, 'with description', this.data.postDesc); 
        console.log('video size: ', this.size);
        console.log('blob id', video_id_from_url(blob.url));
        console.log('blob.start', blob.start, 'blob.end', blob.end, 'blob.length', blob.length);
        console.log()
        // check that it is done
        this.isDone = true;
        // add the blobs together so that it make a choerent video
        this._addBlobsTogether();
        // return if the video is done
        return this.isDone;
    }

    _addBlobsTogether() { // just the first one for now
        // make the complete video
        this.complete_video = this.blobs[0].blob;
        // if creation was successful 
        if (this.complete_video){
            // make a unique uuid 
            this.videoFileUUID = uuidv4();
            // set video id to data
            this.data.videoFile = this.videoFileUUID;
        }
    }

    getBinary() { // returns the video
        return this.complete_video 
    }

    getID() { // returns the video id
        return this.videoFileUUID;
    }

    getBlob() { // returns the blobs
        return this.blobs;
    }

    getPostId() { // returns the post id
        return this.data.p
    }

}

class BlobVideo {
    constructor(blob) {
        this.blob = blob.video ?? null;
        this.start = blob.range.start ?? null;
        this.end = blob.range.end ?? null;
        this.length = blob.range.length ?? null;
        this.url = blob.url ?? null;
    }
}


export { Video, BlobVideo };
