import { createRequire } from "module";
const require = createRequire(import.meta.url);

const EventEmitter = require("events");

// EventEmiter is a javascript class that we can create instances of it
// We can here create instances from events module for different subjects
//.... we want to emit events from

const celebrity = new EventEmitter(); // we can say that here the celebrity will be emmitting events about his life to observers

// Now we can have different observers who subscribe to events from celebrates

// Let's say the observer 1 is subscribing to celebrity.
// We do this like this by observer calling the celebrity

celebrity.on("win race", () => {
  // Note that in NodeJs, Listeners are callback functions. Here when our celebrity wins, we call that callback function
  console.log("Congratulation!, You are the best");

  // Every time the celebrity emits the event "Win race", the observer will send this message.
});

// WE CAN HAVE MULTIPLE LISTENERS/ OBSERVERS FOR THAT SAME EVENT
// AND THEY WILL BE EXECUTED ONE AFTER THE OTHER

// Here let's say the Observer2 who is subscribed to events from celebrity is a competitor
celebrity.on("win race", () => {
  console.log("Boooo, I could have done better than that!");
});

// Now, HOW DO WE TRIGGER or EMIT THESE EVENTS('Win race')

// The EventEmitter Class has a solution. we call the subject or instance and add emit function
// then in braces and the name of the event.

celebrity.emit("Win race");
// In fact we can emit many/ or trigger many event
celebrity.emit("Loss the race"); // This event won't be triggered as it is not created
celebrity.emit("win race");
