import React from 'react'
import { Back } from '@Components';
import './index.css'


function SettingHeader() {
    return (
        <div className={'setting-header-container'}>
            <div className={'d-flex align-items-center'}>
                <Back />
                <div className={'screen-heading'}>{'Department'}</div>
            </div>
        </div>
    )
}

export { SettingHeader }