import DataType from "./DataType.js";

class Images extends DataType {
    constructor(image_data) {
        super(image_data);
        this.image = image_data.image;
    }
}

export default Images;
