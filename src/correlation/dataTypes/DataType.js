class DataType {
    // create a data type with the given data
    constructor(data) {
        this.data = { ...data };
        if (!this.data.id){
            console.log( this.data.id );
            throw new Error("DataType must have an id field");
        }else 
            this.id = this.data.id;
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
