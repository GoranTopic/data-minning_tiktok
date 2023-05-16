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
    }
    addBlob(blob) {
        this.blobs.push(blob);
        console.log('adding blob to video', this.data.postDesc, " from ", this.data.authorName);
        console.log('start', blob.start, 'end', blob.end, 'length', blob.length);
        console.log('video size: ', this.size);

        //console.log(this.blobs);
    }
    getPostId() {
        return this.data.p
    }
}

class BlobVideo {
    constructor({ blob, start, end, length, url }) {
        this.blob = blob;
        this.start = start;
        this.end = end;
        this.length = length;
        this.url = url;
    }
}


export { Video, BlobVideo };
