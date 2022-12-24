import { User } from "./models/User";

const user = new User({ name: "loki", age: 20 });

user.save();

// setTimeout(() => {
//   console.log(user);
// }, 4000);

// user.on("change", () => {
//   console.log("Changed #1");
// });
// user.on("change", () => {
//   console.log("changed #2");
// });
// user.on("save", () => {
//   console.log("save was triggered");
// });

// user.trigger("aaa");
