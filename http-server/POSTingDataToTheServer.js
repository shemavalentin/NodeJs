const http = require("http");

const PORT1 = 3000;
const server1 = http.createServer();

// When we have a very large collection of data say like database
// which is an array of many of these types of json objects

const friends = [
  {
    // in the browser, it will be localhost:3000/friends/0 : this is what
    // we call parameterized end point or Route. and these data are Javascript
    // Objects not String. that's why we need to convert them to string
    id: 0,
    name: "Nikola Tesla",
  },
  {
    id: 1,
    name: "Albert Einstein",
  },
  {
    id: 2,
    name: "Sir Isaac Newton",
  },
];

server1.on("request", (req, res) => {
  // writting End Point by first of all checking the req.url
  const items = req.url.split("/");
  //    ..empty../friend/2 this will give us (=>) ['', 'friend', '2']

  // POST   (Adding another case to add a friend to the server)
  if (req.method === "POST" && items[1] === "friends") {
    // Now here remember that the req is a readable stream/ listener. so we do

    req.on("data", (data) => {
      // the data that the client gives us. let's say data are in JSON here,
      // there is some conversion happening here:

      // The JSON that the browser is passing to our server is being received
      // as a buffer, which we are then converting to a string as bellow,
      // but we need to convert it back to an object so that we can add it to
      // our list of friends.

      // Note that we read from the request and we write to the response
      // let's show the data we get back in our callback

      // The data that Node gives us on a readable stream like request
      // is passed in as this node buffer object, which is a collection
      // of row bytes that are sent to us from the client, from the browser
      // making that request.  Now to print out this data we need to convert it
      // to a string to print it.
      const friend = data.toString(); //
      console.log("Response:", friend);

      // the last step here is to parse the string outputed after conversion which
      // will return an object to add to our list as intended in POST method
      // for shot JSON.parse(friend); //  this returns an object

      // then take the returned JS object and push into the array
      friends.push(JSON.parse(friend));

      // There we goooo!!!, our data is now added
      // but when we restart the server the data won't persist due to we don't have the database.
      // It's just living in that array in memory but the process for saving
      // to a database would follow the exact same flow.

      /*
        THIS IS HOW WE ADDED DATA INTO OUR FROM THE BROWSER

    fetch('http://localhost:3000/friends', {  
    method: 'POST',
    // the node fetch function accept a stream of data not a JS object. That's why we need to convert
    body: JSON.stringify({id: 3, name: 'Ryan Dahl'})
});
         */
    });

    // A PUZZLE NOW, HOW WOULD WE MAKE AN ENDPOINT THAT ECHOS BACK THE DATA
    // THAT THE USER PASSED PASSED IN THE REQUEST BACK TO THEM EXACTLY AS
    // THEY HAD PASSED IT. (So if we send the data for Albert Einstein in
    // the POST request, the response to that request will be the exact same
    // data about Einstein)

    // ANS: We pass in some JSON data in the readable stream and then pipe into
    // it into the writable stream, which is the response to send back that same
    // JSON back to the browser.
    // we can do this

    req.pipe(res); // this is it. purposly put here afte processing the request
  }

  // GET Method
  // being specific of the methods we are using btn 'GET' and 'POST'
  else if (req.method === "GET" && items[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    if (items.length === 3) {
      // creating the variable to hold the string (that is req.url) and convert it into number

      const friendIndex = Number(items[2]); // or use +
      // when the length is equal to 3, we are going to send the stringfied version
      res.end(JSON.stringify(friends[friendIndex])); // the end() function is not even needed because we are using pipe on the req. when the request finishes that's where the response will end.
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && items[1] === "messages") {
    res.setHeader("Content-Type", "text/html");

    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li> Hello Valentin!</li>");
    res.write("<li> What are your thoughts about Aerospace</li>");
    res.write("</url>");
    res.write("</body>");
    res.write("</html>");

    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server1.listen(PORT1, () => {
  console.log(`Listening to the port ${PORT1} ...`);
});
