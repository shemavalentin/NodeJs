// Let's write a function that decrypt the data

function decrypt(data) {
  return "decrypted data";
}
// Here in response we need a function that will read our response

function read() {
  return decrypt("data");
}

/*
Note that we are not obviously encrypting data. the browser/servers use TLS protocal 
to encrypt our data.

What we are interested with here is the structure
*/

// let's now export this module

module.exports = {
  read,
};
