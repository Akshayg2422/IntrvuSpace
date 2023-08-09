import { Button, SearchInput, TopNavbar } from '@Components'
import { useInput, useNavigation } from '@Hooks'
import { FromCollection, FromJD, FromSkills } from '@Modules'
import { useState } from 'react'
import { useDispatch } from 'react-redux'


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
    const [selectedInterview, setSelectedInterview] = useState<any>(0);


    function renderComponent() {

        let component = <FromCollection />

        switch (selectedInterview) {
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
                            const selected = index === selectedInterview
                            return (
                                <div className='m-1 row col-xl  col-sm-3'>
                                    <Button
                                        block
                                        size={'md'}
                                        className=''
                                        color={!selected ? 'neutral' : 'primary'}
                                        text={title}
                                        onClick={() => {
                                            setSelectedInterview(index);
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
