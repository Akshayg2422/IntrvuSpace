import { Button, SearchInput, TopNavbar, showToast } from '@Components'
import { useDropDown, useInput, useLoader, useModal, useNavigation, useWindowDimensions } from '@Hooks'
import { FromCollection, FromJD } from '@Modules'
import { createSchedule, getKnowledgeGroups, getMyPastInterviews, getSectors, postJdVariant, selectedScheduleId } from '@Redux'
import { ROUTES } from '@Routes'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


function Clients() {
    const dispatch = useDispatch()
    const { goTo } = useNavigation()


    const [isFromJD, setIsFromJD] = useState(true);
    const search = useInput('');


    // useEffect(() => {
    //     getKnowledgeGroupDetailsApiHandler();
    // }, [search.value, selectedClientSector])

    // const getKnowledgeGroupDetailsApiHandler = () => {
    //     const params = { sector_id: selectedClientSector?.id, q: search.value }

    //     dispatch(
    //         getKnowledgeGroups({
    //             params,
    //             onSuccess: () => () => {
    //             },
    //             onError: () => () => {
    //             },
    //         })
    //     );
    // };



    const scheduleApiHandler = (id: any, type: 'Call' | "Schedule") => {
        const params = {
            knowledge_group_variant_id: id
        }
        dispatch(createSchedule({
            params,
            onSuccess: (response: any) => () => {
                if (type === 'Call') {
                    dispatch(selectedScheduleId(response.details.schedule_id))
                    goTo(ROUTES['designation-module'].call)
                } else {
                    showToast('Scheduled Successfully')
                }
            },
            onError: (error) => () => {
                showToast(error.error_message, 'error')
            },
        }))
    }

    const scheduleApiForJdHandler = (id: any, type: 'Call' | "Schedule") => {
        const params = {
            knowledge_group_variant_id: id
        }
        dispatch(createSchedule({
            params,
            onSuccess: (response: any) => () => {
                if (type === 'Call') {
                    dispatch(selectedScheduleId(response.details.schedule_id))
                    goTo(ROUTES['designation-module'].call)
                } else {
                    showToast('Scheduled Successfully')
                }
            },
            onError: (error) => () => {
                showToast(error.error_message, 'error')
            },
        }))
    }


    return (
        <>
            <TopNavbar />

            <div className={`container-fluid mt-8`}>
                <div className='row align-items-center'>
                    <div className='col-sm-5'>
                        <SearchInput defaultValue={search.value} onSearch={search.set} />
                    </div>
                    <Button color={isFromJD ? 'neutral' : 'primary'} className='col-sm-2' size={'md'} text={'From Collection'}
                        onClick={() => {
                            setIsFromJD(false);
                        }} />
                    <Button
                        color={isFromJD ? 'primary' : 'neutral'}
                        className='col-sm-2' size={'md'}
                        text={'From JD'}
                        onClick={() => {
                            setIsFromJD(true);
                        }} />
                </div >
                {isFromJD ? <FromJD /> : <FromCollection />}
            </div >
        </>
    )
}

export { Clients }
