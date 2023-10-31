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
                        await getToken(messaging, { vapidKey: "BD5aZHwZIyX059dLk82eWD3UkTRU_dQmAItEmoOteN23g_puGV-6VBKXc4yAuKvaATzc7b2iBTtLmhf4K78AeSU", serviceWorkerRegistration: registration })
                            .then((currentToken) => {
                                if (currentToken) {
                                    localStorage.setItem(FCM_TOKEN, currentToken)
                                    dispatch(setFcmToken(currentToken))
                                } else {
                                }
                            }).catch((err) => {
                            });
                    })
                    .catch(function (err) {
                    });
            }
        }
        else if (permission === "denied") {
        }
    }
    return (
        <div></div>
    )
}

export default GetToken;