import React, { useEffect } from 'react'
import { SearchInput, Button, Modal, Divider, NoDataFound, ButtonGroup, Input, TextArea } from '@Components'
import { useDropDown, useInput, useModal } from '@Hooks'
import { useSelector, useDispatch } from 'react-redux'
import { Sectors } from '@Modules'
import { getKnowledgeGroups } from '@Redux'
import { capitalizeFirstLetter } from '@Utils'

function Clients() {

    const FILTER = [{ id: 1, title: 'All' }, { id: 2, title: 'Past' }]

    const dispatch = useDispatch()

    const { knowledgeGroups, selectedClientSector } = useSelector((state: any) => state.DashboardReducer)
    const addJd = useModal(false);
    const filter = useDropDown(FILTER[0]);
    const search = useInput('');



    const sector = useInput('');
    const designation = useInput('');
    const role = useInput('');
    const jd = useInput('');



    function submitJdApiHandler() {


    }




    useEffect(() => {
        getKnowledgeGroupDetailsApiHandler();
    }, [search.value, selectedClientSector])

    const getKnowledgeGroupDetailsApiHandler = () => {
        const params = { sector_id: selectedClientSector?.id, q: search.value }

        console.log(JSON.stringify(params));

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



    return (
        <>
            <div className='m-3'>
                <div className='row'>
                    <div className='col-7'>
                        <SearchInput defaultValue={search.value} onSearch={search.set} />
                    </div>
                    <div className='col text-right'>
                        <Button className={'text-white'} text={'From JD'} onClick={addJd.show} />
                    </div>
                </div>
                <div className='col text-right mt-3'>
                    <ButtonGroup size={'btn-sm'} sortData={FILTER} selected={filter.value} onClick={filter.onChange} />
                </div>

                <div className='mx-3'>
                    <Sectors />
                    <div className='row'>
                        {
                            knowledgeGroups && knowledgeGroups.length > 0 && knowledgeGroups.map(item => {
                                const { id, name, description, knowledge_group_variant } = item;
                                return (
                                    <div className='col-4' key={id}>
                                        <div className='card justify-content-center p-3'>
                                            <h3 className='mb-0'>{capitalizeFirstLetter(name)}</h3>
                                            <Divider space={'3'} />
                                            <div className='overflow-auto  overflow-hide' style={{
                                                height: 150
                                            }}>
                                                {
                                                    knowledge_group_variant && knowledge_group_variant.length > 0 ? knowledge_group_variant.map((each: any, index: number) => {
                                                        const { id, name } = each;
                                                        const isFirst = index === 0

                                                        return <div key={id} className={isFirst ? '' : 'my-2'}>
                                                            <small className='text-sm'>{capitalizeFirstLetter(name)}</small>
                                                        </div>
                                                    }) : <div className='d-flex align-items-center justify-content-center h-100'> <NoDataFound /></div>
                                                }
                                            </div>

                                        </div>
                                    </div>

                                )
                            })

                        }

                    </div>

                </div>


            </div >

            <Modal title={'Create JD'} isOpen={addJd.visible} onClose={addJd.hide}>
                <Input
                    className={'col-7'}
                    placeHolder={"Sector"}
                    value={sector.value}
                    onChange={sector.onChange}
                />
                <Input
                    className={'col-7'}
                    placeHolder={"Designation"}
                    value={designation.value}
                    onChange={designation.onChange}
                />
                <Input
                    className={'col-7'}
                    placeHolder={"Role"}
                    value={role.value}
                    onChange={role.onChange}
                />
                <TextArea
                    className={'col-7'}
                    value={jd.value}
                    onChange={jd.onChange}
                />

                <Button text={'Submit'} onClick={submitJdApiHandler} />

            </Modal>
        </>
    )
}

export { Clients }