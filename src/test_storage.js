import { Dataset, KeyValueStore } from 'crawlee';

let testdb = await Dataset.open('new dataset');

testdb.pushData({ name: 'test1', value: 1 });

// Open a named key-value store
const images = await KeyValueStore.open('Images');

// Write a record. JavaScript object is automatically converted to JSON,
// strings and binary buffers are stored as they are
await images.setValue('', { foo: 'bar' });

