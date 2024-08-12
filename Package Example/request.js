// let's now use axios after installation
const axios = require("axios");

// Now find out what we can do by axios we have downloaded
// by browsing to npmjs.com

// Now whether to pass in URL and the callback, let's do the other way by using some promises

axios
  .get("https://www.google.com")
  .then((response) => {
    console.log(response);
  })
  // let's say we misstyped the url. we have the way to catch error

  .catch((error) => {
    console.log("Something wrong happen!", error);
  })
  // We can keep on chaining by adding more functions
  .then(() => {
    console.log("This is all done");
  });

/* Now to get use of the short command when run the app, 
  we need to add in package.json the start command
   */

// ======================
// we can use nodemon package to restart the node when there is a change
// It tracks changes in a node application.

// to use it, we have to add a script in package.json
// When using nodemon, it runs the automatically the codes and see the output
