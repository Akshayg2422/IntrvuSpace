import { messaging } from '../Config'
import React, { useEffect } from 'react'
import { getToken } from "firebase/messaging" /**which is used to retrieve the FCM token. */
import { FCM_TOKEN } from '@Utils'
import { useDispatch } from 'react-redux'

import { setFcmToken } from '@Redux'
const GetToken = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        pushNotification()
    }, [])



    const pushNotification = async () => {
        const permission = await Notification.requestPermission()
        if (permission === "granted") {
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker
                    .register("./firebase-messaging-sw.js")
                    .then(async function (registration) {
                        console.log("Registration successful, scope is:", registration.scope);
                        await getToken(messaging, { vapidKey: "BJ6Zhlt6n6SvJ1vb6ERTdgbdPfa-mQY0_2ojN28VyUAXoNI0TqRdFpZisYdrHz6aHps1f2jnTElAr0FXF4aIJME", serviceWorkerRegistration: registration })
                            .then((currentToken) => {
                                if (currentToken) {
                                    console.log('current getToken for client: ', currentToken);
                                    localStorage.setItem(FCM_TOKEN, currentToken)
                                    dispatch(setFcmToken(currentToken))
                                } else {
                                    console.log('No registration token available. Request permission to generate one.');
                                }
                            }).catch((err) => {
                                console.log('An error occurred while retrieving token. ', err);
                            });
                    })
                    .catch(function (err) {
                        console.log("Service worker registration failed, error:", err);
                    });
            }

        }
        else if (permission === "denied") {
            console.log("Denied Notifications")
        }

    }


    return (
        <div></div>
    )
}

export default GetToken;