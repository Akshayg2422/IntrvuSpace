import React from 'react'
import { HeaderProps } from './interfaces'
import { ButtonGroup, Image } from '@Components'
import { Profile } from '@Modules'
import { ROUTES, } from '@Routes'
import { useNavigation } from '@Hooks';
import { icons } from '@Assets'


function Header({ selected, onClick }: HeaderProps) {

    const { goTo } = useNavigation()

    const FILTER = [{ id: 1, title: 'Home' }, { id: 2, title: 'My Schedule' }]

    return (
        <div className='row'>
            <div className='col'>
                <div className='row align-items-center'>
                    <Image src={icons.logoText} height={40} width={40} />
                    <div className='d-flex align-items-center ml-2'>
                        <h1 className='display-4 font-weight-bolder text-primary mb-0'>intrvu<b className='text-black'>SPACE</b></h1>
                    </div>
                </div>
            </div>
            <div className='col text-lg-right'>
                <ButtonGroup size={'btn-md'} sortData={FILTER} selected={FILTER[selected]} onClick={(selected) => {

                    if (selected.id === FILTER[0].id) {
                        goTo(ROUTES['designation-module'].client)
                    } else {
                        goTo(ROUTES['designation-module'].schedules)
                    }

                }} />

            </div>
            <div className='mt--2 mr-3'>
                {/* <Profile /> */}
            </div>
        </div>
    )
}

export { Header }