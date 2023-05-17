import DataType from "./DataType.js";

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
        console.log('adding blob to video', this.data.postDesc, " from ", this.data.authorName);
        console.log('video size: ', this.size);
        console.log('start', blob.start, 'end', blob.end, 'length', blob.length);
        console.log('blob:', blob);
        //console.log(this.blobs);
    }
    getPostId() {
        return this.data.p
    }
    isDone = () => this.isDone
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
