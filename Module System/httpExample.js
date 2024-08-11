// Let's start by requiring the http module and assign it to the constant like http
require("http");
// Assign it to the constant
const http = require("http"); // we are going to use it to make requests agains google servers

// Until here, the require function has set the http constant to the set of
// functions and data that are returned from HTTP module

// One of these functions is the "request" function which we can call using that set constant
// now

//  after executing this block of code and doesn't show anything,
// let's assign the request to a variable and add end() function to the end of the request

const req = http.request("http://www.google.com", (res) => {
  // always add the protocal to the url
  // the response passed into the callback func is the response(res) is
  // result of making request(here from google.com) that we have just specified
  // it may be a URL, a string.

  // And the way we get data back from the response is subscribing to response
  // with on() function that takes a name of an event and a listener which is a callback

  res.on("data", (chunk) => {
    // Here EventEmitter in action
    console.log(`Data chunk: ${chunk}`);
  });

  // the res can emit many events depending on the size of data(url or string) and one of those id end event to mean there is no other data
  res.on("end", () => {
    // the end event doesn't have an argument passed
    console.log("No more data");
  });
});

req.end();
*/
// ======================TO BE SECURE LET'S USE https =====================================

const http = require("https");
const reqs = http.request("https://www.google.com", (res) => {
  res.on("data", (chunk) => {
    // Here EventEmitter in action
    console.log(`Data chunk: ${chunk}`);
  });

  // the res can emit many events depending on the size of data(url or string) and one of those id end event to mean there is no other data
  res.on("end", () => {
    console.log("No more data");
  });
});

req.end();

// =============== DESTRICTURING http================
 
const {request} = require("https");

const reqst = request("https://www.google.com", (res) => {
  res.on("data", (chunk) => {
    // Here EventEmitter in action
    console.log(`Data chunk: ${chunk}`);
  });

  // the res can emit many events depending on the size of data(url or string) and one of those id end event to mean there is no other data
  res.on("end", () => {
    console.log("No more data");
  });
});

reqst.end();

// ============= WE CAN ALSO MAKE REQUESTS USING GET METHOD ==========

const {get} = require("https");

 get ("https://www.google.com", (res) => {
  res.on("data", (chunk) => {
    // Here EventEmitter in action
    console.log(`Data chunk: ${chunk}`);
  });

  // the res can emit many events depending on the size of data(url or string) and one of those id end event to mean there is no other data
  res.on("end", () => {
    console.log("No more data");
  });
});

// reqs1.end();  No need to call end() function, it is called by the get method
// when the request is done


