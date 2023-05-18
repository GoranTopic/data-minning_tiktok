import { v4 as uuidv4 } from 'uuid';


class DataType {
    // create a data type with the given data
    constructor(data) {
        this.data = { ...data };
        if (this.data.id)
            this.id = this.data.id;
        else 
            this.id = uuidv4();
    }
    // update the data with the new data
    update(data) {
        // update the data with the new data
        this.data = { ...this.data, ...data };
    }
    // return a js obj data obj of the data
    toObj() { 
        return { ...this.data };
    }
}

export default DataType;
