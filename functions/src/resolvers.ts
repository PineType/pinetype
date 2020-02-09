import * as admin from "firebase-admin";
admin.initializeApp();

const resolverFunctions = {
  Query: {
    users: () =>
      admin
        .database()
        .ref("users")
        .once("value")
        // @ts-ignore
        .then(snap => snap.val())
        // @ts-ignore
        .then(val => Object.keys(val).map(key => val[key])),
    notes: () => 
      admin
      .database()
      .ref("notes")
      .once("value")
      // @ts-ignore
      .then(snap => snap.val())
      // @ts-ignore
      .then(val => Object.keys(val).map(key => val[key])),
  }
  };
  
  export default resolverFunctions;
