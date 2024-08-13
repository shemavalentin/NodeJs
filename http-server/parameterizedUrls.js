const http = require("http");

const PORT1 = 3000;
const server1 = http.createServer();

// When we have a very large collection of data say like database
// which is an array of many of these types of json objects

const friends = [
  {
    // in the browser, it will be localhost:3000/friends/0 : this is what
    // we call parameterized end point or Route
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
  // Let's say for example we have a url of a request that is:
  //    ..empty../friend/2 this will give us (=>) ['', 'friend', '2']

  //there is many ways we can use to parse in the data when it is a collection but let's use the
  // quick one by using string split method because request URL is a string,
  // splitting it whenever we find a forwad slash.

  if (items[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    // Here we need to add an additional check where we check if the length of the items
    // items of array exist
    if (items.length === 3) {
      // creating the variable to hold the string (that is req.url) and convert it into number

      const friendIndex = Number(items[2]); // or use +
      // when the length is equal to 3, we are going to send the stringfied version
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (items[1] === "messages") {
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
