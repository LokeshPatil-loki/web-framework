import { Collection } from "./models/Collection";
import { User, UserProps } from "./models/User";
import { UserEdit } from "./views/UserEdit";
import { UserList } from "./views/UserList";

// const collection = User.buildUserCollection();
// collection.fetch();

// console.log(collection);

const root = document.getElementById("root");

if (root) {
  // const userEdit = new UserEdit(root, User.buildUser({ name: "Lokesh Patil", age: 20 }));
  // userEdit.render();
  // console.log(userEdit);
  // const userList = new UserList(root, User.buildUserCollection());
  const collection = User.buildUserCollection();
  collection.on("change", () => {
    const userList = new UserList(root, collection);
    userList.render();
  });
  collection.fetch();
  // userList.render();
} else {
  throw new Error("Root element not found");
}
