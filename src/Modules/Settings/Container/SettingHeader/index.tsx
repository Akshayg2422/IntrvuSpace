import React from 'react'
import { Back, Button } from '@Components';
import { SettingHeaderProps } from './interfaces'
import './index.css'


function SettingHeader({ title, buttonText, onClick }: SettingHeaderProps) {
    return (
        <div className={'setting-header-container'}>
            <div className={'d-flex align-items-center'}>
                <Back />
                <div className={'screen-heading ml-2'}>{title}</div>
            </div>


            <div className={'btn-wrapper'}>
                {onClick &&
                    <Button
                        block
                        text={buttonText}
                        onClick={onClick}
                    />
                }
            </div>

        </div>
    )
}

export { SettingHeader }