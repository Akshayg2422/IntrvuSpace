import { initializeApp } from "firebase/app"
import { getMessaging } from "firebase/messaging"


const firebaseConfig = {
  apiKey: "AIzaSyALHRM7TgPr6Jf33KK5iEf38o0IPk05ZCg",
  authDomain: "qunata-tms.firebaseapp.com",
  projectId: "qunata-tms",
  storageBucket: "qunata-tms.appspot.com",
  messagingSenderId: "542870698459",
  appId: "1:542870698459:web:2d78445e059c0973f10ffe",   
  measurementId: "G-QVT58EMGY6"
};

// initializeApp takes the firebaseConfig object as a parameter and returns a Firebase app instance. This app instance is stored in the config constant.


export const config = initializeApp(firebaseConfig)

// getMessaging takes the config constant as a parameter and returns a Firebase messaging instance. This messaging instance is stored in the messaging constant, and can be used to send and receive push notifications.

export const messaging = getMessaging(config)