// import { ImageView } from '@components';
// import {  ROUTE } from '@utils';
import { useNavigation } from "@Hooks";
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import GetToken from './GetToken';
import { onMessageListener } from './OnMessaging';
import { icons } from '@Assets';
import { ROUTES } from "@Routes";
import { useDispatch } from 'react-redux'

const MAX_LENGTH = 70

const PushNotification = () => {

    const NOTIFICATION_TASK_RAISED = 'TASK_RAISED'
    const NOTIFICATION_TICKET_RAISED = 'TICKET_RAISED'
    const NOTIFICATION_BROADCAST_MESSAGE = 'BROADCAST_MESSAGE'
    const NOTIFICATION_GROUP_MESSAGE = 'GROUP_MESSAGE'
    const NOTIFICATION_TASK_CHANNEL_EVENT = 'TASK_CHANNEL_EVENT'

    const { goTo } = useNavigation();
    const [notification, setNotification] = useState<any>([]);
    const dispatch = useDispatch()

    const notify = () => {
        notification.forEach((message: any) => {
            toast(<ToastDisplay data={message} />, {
                position: 'top-right', duration: 3000,
            });
        });
    };

    function ToastDisplay({ data }: any) {
        const MAX_LENGTH = 50;

        const bodyContent = data?.body?.length <= MAX_LENGTH
            ? data?.body
            : data?.body?.slice(0, MAX_LENGTH) + '...';

        return (
            <div onClick={() => {
                // goTo(navigation, data?.route);
            }}>
                <p><b>{data?.title}</b></p>
                <div className='d-flex justify-content-center align-items-center'>
                    {/* {data.icon && <div>
                        <ImageView
                            icon={data.icon}
                            style={{ height: '50px', width: '50px', borderRadius: "5px" }}
                        />
                    </div>} */}
                    <div className={data.icon ? 'ml-3' : ''}>{bodyContent}</div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        if (notification && notification.length > 0) {
            notify()
        }
    }, [notification])

    const routingHandler = (payload: any) => {

        const route_type = JSON.parse(payload?.data?.extra_data.replace(/'/g, '"')).route_type

        if (route_type === NOTIFICATION_GROUP_MESSAGE) {
            goTo(ROUTES['user-company-module'].Groups);
        }
        else if (route_type === NOTIFICATION_TASK_RAISED) {
            goTo(ROUTES["task-module"].tasks)
        }
        else if (route_type === NOTIFICATION_TICKET_RAISED) {
            goTo(ROUTES['ticket-module'].tickets)
        }
        else if (route_type === NOTIFICATION_BROADCAST_MESSAGE) {
            goTo(ROUTES['message-module'].broadcast)
        }
        else {
            goTo(ROUTES['user-company-module'].Groups)
        }

    }

    onMessageListener()
        .then((payload: any) => {
            setNotification(payload)
            const title = payload?.data?.title;
            const options = {
                body: payload?.data?.message,
                icon: icons.quantaTms,
            };

            const route_type = JSON.parse(payload?.data?.extra_data.replace(/'/g, '"')).route_type

            new Notification(title, options).addEventListener('click', function () {
                routingHandler(payload)
                this.close()
            });

        })
        .catch((err: any) => { });

    return (
        <>
            {/* <Toaster /> */}
            <GetToken />
        </>
    )
}

export { PushNotification }