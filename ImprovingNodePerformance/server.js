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
    // NOTE THAT THIS WHILE LOOP WILL CAUSE THE SERVER TO SLOW DOWN.
  }
}
/*
*  What are real life functions that act like the above WHILE loop, that is blocking the event loop?

* TWO FUNCTIONS LIKELY TO SEE ARE:  
 JSON.stringfy() : This function takes in a javascript object and returns the string representation of that object.
 and
 JSON.parse():  this function does the opposite of JSON.stringfy. It takes s stringfied object and returns the 
 corresponding object

 These functions mentioned don't take too long like while loop but they delay. 
 No other request can be processed before this functions end what they are doing

 Some other examples that block the event loop are like sorting the array.
 for very large arrays this is going to block
 [5, 1,2,3,4].sort()

*/

// Let's have two routes

app.get("/", (req, res) => {
  // JSON.stringify({}) => "{}"
  // JSON.parse("{}") => {}
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

const obj1 = {
  name: "Valentin",
  lastNane: "Shema",
};

JSON.stringify(obj1); // {"name": "Valentin","lastNane": "Shema'"}

// NOW
const jsonObj = JSON.stringify(obj1);
JSON.parse(jsonObj);
