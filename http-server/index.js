// let's start by importing the http
const http = require("http");

// let declare the port to specifically direct request to the right server
// as a server could might receive multiple applications

const PORT = 3000;

// let's start by creating a server and assign it on a constant

// basically the createServer function takes two parameters: One that is a call back
// that tells the server what to do when it sees the request(req), and response that will be sent to the client

const server = http.createServer((req, res) => {
  // both req and res are streams
  // req: is a readable stream which we can listen to for data coming in through that stream by using the .on()function
  // res: is a writtable stream which we can write data to send to the client

  // let's use writeHead() to write some headers to the response
  res.writeHead(
    // first param is the status of the response
    200,
    {
      // the object with list of all of our response headers.
      // => "Content-Type": "text/plain", <======
      // now what if we wanted to return other type of data, Say we wanted to
      // return a JavaScript object instead of this text.
      // that's what that "Content-Type is for"
      // we have to tell it other type.

      "Content-Type": "application/json", // that's it.
    }
  );
  // Now how do we set the data to pass back to the browser?

  // we can use this: res.end() ==> It is called end because it signals
  // that the response including the  headers and any other data that we
  // want to pass  is now complete and ready to be sent back. so this res.end()
  // needs to be called on each request that comes in to the server, even if
  // it's empty

  //   res.end("Hello! Sir Isaac Newton is your friend!");

  // After specifying that the content-type is a JS object, we are now allowed
  // to pass in res.end() with object of data we want to send to data.

  // Before, we send our data back to the browser is to turn it into a
  // string, which is what this res.end function expects to be passed in.

  res.end(
    JSON.stringify({
      id: 1,
      name: "Sir Isaac Newton",
    })
  );
});

// NOT YET DONE

//Let's tell the server to start to listen to the requests
// Note, by default the server listen to our machine which doesn't have the
// domain name like google.com but it has the ip address that is: 127.0.0.1 (local machine/ local host)
server.listen(
  // pass in the port to listen
  PORT,
  // AND the call back that runs when the server starts listening.
  () => {
    console.log(`Listening to the port ${PORT} ...`);
  }
);
