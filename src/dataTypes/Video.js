import DataType from "./DataType.js";

class Video extends DataType {
    constructor(video) {
        super(video);
        // binary blob video to hold
        this.blobs = [];
        // this is the url to the video
        this.url = this.data.playAddr ?? this.data.downloadAddr;
        // the the lenght of the video
        this.length = this.data.length
    }
    addBlob(blob) {
        this.blobs.push(blob);
        //console.log(this.blobs);
    }
}

class BlobVideo {
    constructor({ blob, start, end, length, url }) {
        this.blob = blob;
        this.start = start;
        this.end = end;
        this.length = length;
        this.url = url;
        console.log('start', start, 'end', end, 'length', length);
    }
}


export { Video, BlobVideo };
