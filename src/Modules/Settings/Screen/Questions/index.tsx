import React, { useEffect } from 'react'
import { Button, Card, Divider, NoDataFound } from '@Components'
import { useNavigation, useWindowDimensions } from '@Hooks'
import { ROUTES } from '@Routes'
import { icons } from '@Assets';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionForm } from '@Redux';
import { capitalizeFirstLetter } from '@Utils';

function Questions() {

    const { goTo } = useNavigation();
    const dispatch = useDispatch()
    const { selectedGroupId, questionForm } = useSelector((state: any) => state.DashboardReducer)

    useEffect(() => {
        getQuestionsFormApi()
    }, [])


    const getQuestionsFormApi = () => {
        const params = {
            knowledge_group_variant_id: selectedGroupId?.id
        };

        dispatch(
            getQuestionForm({
                params,
                onSuccess: (response: any) => () => {
                },
                onError: (error) => () => {
                },
            })
        );
    }


    console.log(JSON.stringify(questionForm) + '====questionForm');


    return (
        <>
            <div className='mx-3'>
                <div className='m-3'>
                    <div className='row'>
                        <div className='col text-right'>
                            <Button
                                className="text-white"
                                size={'md'}
                                variant={'icon-rounded'}
                                icon={icons.addFill}
                                onClick={() => {
                                    goTo(ROUTES['group-module']['create-question-form'])
                                }}
                            />
                        </div>
                    </div>


                    <div className='row mt-2'>
                        {
                            questionForm && questionForm.length > 0 && questionForm?.map(item => {
                                console.log('0000000000', item)
                                const { id, name, description } = item;
                                return (
                                    <div className='col-4' key={id}>
                                        <div className='card justify-content-center p-3'>
                                            <h3 className='mb-0'>{'Questions'}</h3>
                                            <div className={'mx--3'}><Divider space={'3'}/></div>
                                            <div className='mb-0'>{capitalizeFirstLetter(name)}</div>
                                            <div className='mb-0'>{capitalizeFirstLetter(description)}</div>
                                            <div className='overflow-auto  overflow-hide' style={{ height: 150 }}>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                        }

                    </div>
                </div>
            </div >


        </>
    )
}

export { Questions }