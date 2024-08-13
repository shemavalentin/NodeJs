/*
// let's start by importing the http
const http = require("http");

// let declare the port to specifically direct request to the right server
// as a server might receive multiple applications

const PORT = 3000;

// let's start by creating a server and assign it on a constant

// basically the createServer function takes two parameters: One that is a call back
// that tells the server what to do when it sees the request(req), and the response that will be sent to the client

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
  // to pass in res.end() with object of data we want to send to the browser.

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

// ============= CURRENTLY THE SERVER IS RESPONDING THE SAME THING, with Sir Isaac Newton.=====
// but normally we want our server to be a bit dynamic than this
// we need servers to respond to different types of requests depending on some logic
// that lives in the server, with different URLs representing different types of requests

/* The node http server we created is an EventEmitter. when we are passing callback
the (res,req) is the call back and the shorthand of writting 

server.on('request' (res, req) => {

  then pass in here the callback like this
  })
 
*/
// see bellow

const http = require("http");

const PORT1 = 3000;
const server1 = http.createServer();
// we can use the shorthand and write an event emitter
// because the server1 is an event emitter we can write it as an event emitter
/*
server1.on("request", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json", // that's it.
  });

  res.end(
    JSON.stringify({
      id: 1,
      name: "Sir Isaac Newton",
    })
  );
});

server1.listen(PORT1, () => {
  console.log(`Listening to the port ${PORT1} ...`);
});
*/

// NOW HOW WE WRITE END POINTS/URLs TO RESPOND TO DIFFERENT REQUESTS

// we do this like this by looking on the request comming in and specifically
// by checking the request.url and seeing if that matches the end point of our functionality
// Now let's do that

server1.on("request", (req, res) => {
  // writting End Point by first of all checking the req.url

  if (req.url === "/friends") {
    /*
    res.writeHead(200, {
      "Content-Type": "application/json", // that's it.
    });*/

    // you might see the headers written like this: also it is used too
    res.statusCode = 200; // setting the status directly
    res.setHeader("Content-Type", "application/json");

    if (items.length === 3) {
    } else {
    }
    res.end(
      JSON.stringify({
        id: 1,
        name: "Sir Isaac Newton",
      })
    );
  }

  // If we get a request matching a different url, say like messages collection
  // or messages end point, we will do something else
  else if (req.url === "/messages") {
    // Now, let's set html headers response
    res.setHeader("Content-Type", "text/html");

    // Here we may be sending our messages in form of html not json as above
    // due to html can be fairely long, we can write it here using res.write() method
    // to write peace by peace

    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li> Hello Valentin!</li>");
    res.write("<li> What are your thoughts about Aerospace</li>");
    res.write("</url>");
    res.write("</body>");
    res.write("</html>");

    // then tell node that we finished writting to this stream
    res.end();
  }
  // then the server will tell us that the page wasn't found if none these other
  // end points match.
  else {
    res.statusCode = 404;
    res.end();
  }
});

server1.listen(PORT1, () => {
  console.log(`Listening to the port ${PORT1} ...`);
});
