// creating a server
const express = require("express");
const PORT = 3000;

// Initializing express application
const app = express();

//Writting the function to delay our server to respond

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // while we are in our loop, the event loop in completely blocked
    // Then when we call the delay function down in the second route?
  }
}

// Let's have two routes

app.get("/", (req, res) => {
  res.send("Performance example");
});

// The second route

app.get("/timer", (req, res) => {
  // this route will delay the response before it triggers the response
  delay(9000); // Now the server will wait untill 9000 millseconds to run
  res.send("Ding ding ding!");
});

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}...`);
});

// Here was writting a blocking function to show how we can and where we can emprove the
// server performance.
