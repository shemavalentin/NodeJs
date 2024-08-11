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
