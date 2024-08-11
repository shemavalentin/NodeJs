// because we are using https, we need to encrypt data
function encrypt(data) {
  return "encrypted data";
}

// function to send the data

function send(url, data) {
  const encryptedData = encrypt(data);
  console.log(`sending ${encryptedData} to ${url}`);
}

module.exports = {
  // here, we export functions as objects
  send, /// By using ES6 shorthand
};

// NODE ALSO PROVIDES OTHER WAY OF EXPORTING MODULES

// We can do this

// let's say we have another const
module.exports.REQUEST_TIMEOUT = 500;
function encrypt(data) {
  return "encrypted data";
}
// We can add exports on the function we need to export like so

module.exports.send = function send(url, data) {
  const encryptedData = encrypt(data);
  console.log(`sending ${encryptedData} to ${url}`);
};

// module.exports = {
//   REQUEST_TIMEOUT,
//   send,
// };

/* 
NOTE THAT WE CAN ALSO USE THE NODE SHORTHAND AND REMOVE module in front.

the recommendation is to use the first method and it is clear now what your
interface to your module would be and how it will be accessed rather than
going into the whole file and find references
*/
