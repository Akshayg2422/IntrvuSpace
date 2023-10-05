// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js%27);
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js%27);
/* eslint-disable no-undef */

// This a service worker file for receiving push notifitications.
// See `Access registration token section` @ https://firebase.google.com/docs/cloud-messaging/js/client#retrieve-the-current-registration-token

// Scripts for firebase and firebase messaging


importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging-compat.js');

// eslint-disable-next-line react-hooks/rules-of-hooks


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCvSNI82zbIhbPYIDXNG12Gi0TtgNuw2tA",
  authDomain: "mockeazy-28e38.firebaseapp.com",
  projectId: "mockeazy-28e38",
  storageBucket: "mockeazy-28e38.appspot.com",
  messagingSenderId: "891116825734",
  appId: "1:891116825734:web:40fdcb0b3d10de16c9f507"
};


firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Handle incoming messages while the app is not in focus (i.e in the background, hidden behind other tabs, or completely closed).
messaging.onBackgroundMessage(function (payload) {

  const notificationTitle = payload?.data?.title;
  const notificationOptions = {
    body: payload?.data?.message,
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
});