import React from 'react'
import { Opening, OpeningLite } from '@Modules';
import { useSelector } from 'react-redux'

function Schedule() {

    const { dashboardDetails } = useSelector((state: any) => state.AuthReducer);

    const { is_light_variant } = dashboardDetails?.rights || {}
    return (
        <>
            {is_light_variant ? <OpeningLite /> : <Opening />}
        </>
    )
}

export { Schedule }