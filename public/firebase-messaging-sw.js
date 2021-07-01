importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging.isSupported() ? firebase.messaging() : {};

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    click_action: payload.data.click_action,
    data: { url: payload.data.click_action }, //the url which we gonna use later
    actions: [{ action: "open_url", title: "See Now" }],
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  self.addEventListener(
    "notificationclick",
    function (event) {
      switch (event.action) {
        case "open_url":
          clients.openWindow(event.notification.data.url); //which we got from above
          break;
      }
    },
    false,
  );
});
