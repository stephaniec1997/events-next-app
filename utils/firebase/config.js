import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWGtmSqw9agQWot7gw0MccCIhWcOGx_Mg",
  authDomain: "events-next-app.firebaseapp.com",
  // databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "events-next-app",
  storageBucket: "events-next-app.appspot.com",
  messagingSenderId: "937052078875",
  appId: "1:937052078875:web:ac1f32080cd9bb4a9649be",
};

if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
