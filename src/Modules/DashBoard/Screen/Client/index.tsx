import { Button, SearchInput, TopNavbar } from '@Components'
import { useInput } from '@Hooks'
import { FromCollection, FromJD, FromSkills } from '@Modules'
import { setSelectedSection } from '@Redux'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function Clients() {

    const search = useInput('');
    const INTERVIEW_TYPE = [
        {
            id: 1, title: 'From Collection'
        },
        {
            id: 2, title: 'From JD'
        },
        {
            id: 3, title: 'From Skills'
        }
    ]

    const dispatch = useDispatch()
    const { selectedSection } = useSelector((state: any) => state.DashboardReducer)



    function renderComponent() {

        let component = <FromCollection />

        switch (selectedSection) {
            case 0:
                component = <FromCollection />
                break;
            case 1:
                component = <FromJD />
                break;
            case 2:
                component = <FromSkills />
                break;

        }
        return component;
    }


    return (
        <>
            <TopNavbar />
            <div className={`container-fluid mt-7`}>
                <div className='row align-items-center'>
                    <div className='col-sm-5 mb-sm-0 mb-2'>
                        <SearchInput defaultValue={search.value} onSearch={search.set} />
                    </div>

                    {
                        INTERVIEW_TYPE.map((interview: any, index: number) => {
                            const { title } = interview;
                            const selected = index === selectedSection
                            return (
                                <div className='m-1 row col-xl  col-sm-3'>
                                    <Button
                                        block
                                        size={'md'}
                                        className=''
                                        color={!selected ? 'neutral' : 'primary'}
                                        text={title}
                                        onClick={() => {
                                            dispatch(setSelectedSection(index));
                                        }}
                                    />
                                </div>
                            )
                        })
                    }
                </div >
                {
                    renderComponent()
                }

            </div >
        </>
    )
}

export { Clients }
