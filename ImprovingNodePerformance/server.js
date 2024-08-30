/*
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

*/

// ===== CRUSTERING TO INCREASE THE PERFORMANCE=========

const express = require("express");

// To use CLUSTER we need to import it

const cluster = require("cluster");

// Let's be clever enough to create forks, and automate it's creation
// we use the os module in node

const os = require("os");

// As on windows the LibUV leaves the scheduling to the schedular founder in windows
// and as this couse that windows does not follow the round robin approach to distribute
// process, let's use another built in method to inforse use of round-robin in windows

cluster.schedulingPolicy = cluster.SCHED_RR; // This will force Node to use Round Robin even on window

const PORT = 3000;

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {}
}

// Let's have two routes

app.get("/", (req, res) => {
  // JSON.stringify({}) => "{}"
  // JSON.parse("{}") => {}

  // let's use the built in function process to get the process id from the operating system
  // as every work will have it's own pid
  res.send(`Performance example: ${process.pid}`);
});

// The second route

app.get("/timer", (req, res) => {
  delay(9000);
  res.send(`Ding ding ding! ${process.pid}`);
});

// When we run for example node server.js, the master process is started and it's from
// the master process we can call folk() function to create the two or more work process.
// the number you call folk() function that's the number of cork processes is created.
//The work processes that we fork run the same code that we have in server.js
// the only way we differentiate our master process from the work processes is by
// using the isMaster Boolean flag from the cluster module.

// Now here we can write codes that only run when the first time the server.js is executed
// as the master.

// Now let's do it

console.log("Running server.js...");

if (cluster.isMaster) {
  console.log("Master has been started...");

  // cluster.fork(); // each time we call this function from cluster module we create a work.
  // cluster.fork(); // We can write these functions many times as we want.

  // LET'S CREATE WORKERS AUTOMATICALLY DEPENDING ON THE PYSICAL CORES ON OUR MACHINES
  // AND THE LOGICAL CORES

  // we use the built in os.cpus module
  const NUM_WORKERS = os.cpus().length;
  // creating the loop to create all workers using fork function
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
} else {
  // Anything that is written here is when the isMaster is false and then our
  // code is running as a work process.

  // It is only in the work that we listen for incoming HTTP requests and handle them
  // using our Express routes.

  // so we'll only call app.listen when we're running as a work process.

  console.log("Work process started...");
  app.listen(3000);

  // IMPORTANT TO NOTE: the worker process run the same code as the server.js
  // the only difference is the isMaster flag.
}

//app.listen(3000)
