import { getMessaging, onMessage } from 'firebase/messaging'; /**It calls getMessaging to retrieve a messaging instance */

const messaging = getMessaging();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });