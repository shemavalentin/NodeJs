const request = require("./request.js");
const response = require("./response.js");
//we now don't have access to  these functions until we import them using require function
function makeRequest(url, data) {
  // we will need to send request and read the response
  request.send(url, data);

  // the return read response
  return response.read();
}

// Now let's call the function
const responseData = makeRequest("https://www.google.com", "Hello Node");
console.log(responseData);
