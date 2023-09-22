import { initializeApp } from "firebase/app"
import { getMessaging } from "firebase/messaging"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvSNI82zbIhbPYIDXNG12Gi0TtgNuw2tA",
  authDomain: "mockeazy-28e38.firebaseapp.com",
  projectId: "mockeazy-28e38",
  storageBucket: "mockeazy-28e38.appspot.com",
  messagingSenderId: "891116825734",
  appId: "1:891116825734:web:40fdcb0b3d10de16c9f507"
};

// initializeApp takes the firebaseConfig object as a parameter and returns a Firebase app instance. This app instance is stored in the config constant.


export const config = initializeApp(firebaseConfig)

// getMessaging takes the config constant as a parameter and returns a Firebase messaging instance. This messaging instance is stored in the messaging constant, and can be used to send and receive push notifications.

export const messaging = getMessaging(config)