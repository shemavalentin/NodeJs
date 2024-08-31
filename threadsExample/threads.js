// To put our thread to use we need to require the thread module
// Then assign it to its variable in the module by destructuring like this: {Worker}
// Lastly we need to check if we are running the main thread or worker thread: {isMainThread}

//const { isMainThread, Worker } = require("worker_threads");

// combining the two features to create new worker thread by calling new Worker constructor.
// The worker constructor takes a parameter, a string, that points to some file that
// contains Javascript code to be executed in that worker
// the __filename will point to threads.js file.

// new Worker(__filename); // this code will create workers over and over untill our machine can not create worker

// what we want to do is to create new workers if we are in the main thread when we run
// threads.js for the first time. Now let's first check if we are at the mainThread.

/*
if (isMainThread) {
  console.log(`Main Thread! Process ID: ${process.pid}`);
  new Worker(__filename);
  // creating the second thread
  new Worker(__filename);
} else {
  //   console.log("Worker"); // result: We created two workers
  console.log(`Worker! Process ID: ${process.pid}`); // result: We created two workers
}
*/
// IMPORTANT: Worker threads are of the same precess. Unlike clusters, we run node
// multiple times in one process. Let's check the above code by console.log the pid

// Let's send some work to our threads to ckeck the work load

const { isMainThread, workerData, Worker } = require("worker_threads");

if (isMainThread) {
  console.log(`Main Thread! Process ID: ${process.pid}`);
  new Worker(__filename, {
    workerData: [7, 6, 2, 3],
  }); // let's here add another parameter to send the work
  // creating the second thread
  new Worker(__filename, {
    workerData: [1, 3, 4, 3],
  });
} else {
  //   console.log("Worker"); // result: We created two workers
  console.log(`Worker! Process ID: ${process.pid}`);

  // we can have an array of numbers and use the built in Js method that are blocking
  // to sort that array [7,6,2,3],

  //Now after importing the workerData to be available all workers, let's console.log it
  console.log(`${workerData} sorted is ${workerData.sort()}`);
}

/* 
Sorting is a fairly expensive operation when it comes to how much the cpu is consuming
By using the worker threads we can multiply the effectiveness of our CPU by taking 
advantage of its multiple processors, which can run each thread in parallel.

And because we using the worker thread module, all these happen in one process
in the most efficient way possible.

In the above example, both thread workers are runing side by side but in single process.

*/
