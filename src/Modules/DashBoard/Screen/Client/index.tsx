import React, { useEffect } from 'react'
import { SearchInput, Button, Modal } from '@Components'
import { useModal } from '@Hooks'
import { useSelector, useDispatch } from 'react-redux'
import { Sectors } from '@Modules'
import { getKnowledgeGroups } from '@Redux'




function Clients() {

    const dispatch = useDispatch()

    const { sectors, knowledgeGroups } = useSelector((state: any) => state.DashboardReducer)
    const addJd = useModal(false);

    useEffect(() => {
        getKnowledgeGroupDetailsApiHandler();
    }, [])

    const getKnowledgeGroupDetailsApiHandler = () => {
        const params = {}
        dispatch(
            getKnowledgeGroups({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {
                },
            })
        );
    };


    console.log(JSON.stringify(knowledgeGroups));

    return (
        <>
            <div className='m-3'>
                <div className='row'>
                    <div className='col-6'>
                        <SearchInput onSearch={() => { }} />
                    </div>
                    <div className='col text-right'>
                        <Button className={'text-white'} text={'From JD'} onClick={addJd.show} />
                    </div>
                </div>

                <div className='m-3'>
                    <Sectors />
                </div>

                <div>

                </div>

            </div>

            <Modal title={'Create JD'} isOpen={addJd.visible} onClose={addJd.hide} >

            </Modal>
        </>
    )
}

export { Clients }