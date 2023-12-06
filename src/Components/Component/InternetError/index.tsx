import React from 'react'
import { icons } from '@Assets'
import { Image } from '@Components'

function InternetError() {
    return (
        <div className={"auth-screen d-flex flex-column"}>

            <Image
               src={process.env.PUBLIC_URL + '/assets/noInternet.png'}
                height={150}
                width={150}
                style={{
                    objectFit: 'contain'
                }}
            />
            <div className={"text-heading mt-3"}>{'No Internet Connection!'}</div>
            <div className={"text-des mt-2"}>{'Please check your network connection.'}</div>
        </div>
    )
}

export { InternetError }