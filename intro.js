// Readable

// Transform

// Writable

const crypto = require("crypto")
const { Readable, Writable, Transform } = require("stream")

const input = new Readable({
  read() {
    for(let i = 0; i < 10000; i++){
      this.push(crypto.randomUUID());
    }
    this.push(null);
  }
})

const toUpperCase = new Transform({
  transform(chuck, encoding, callback) {
    callback(null, chuck.toString().toUpperCase());
  }
})

const addHello = new Transform({
  transform(chuck, encoding, callback) {
    callback(null, chuck.toString() + " Hello");
  }
})

const output = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
})

input.pipe(toUpperCase).pipe(addHello).pipe(output);