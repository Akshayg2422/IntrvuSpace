import { getMessaging, onMessage } from 'firebase/messaging'; /**It calls getMessaging to retrieve a messaging instance */

const messaging = getMessaging();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload1111111111111111111111111111--------------->", payload)
      resolve(payload);
    });
  });