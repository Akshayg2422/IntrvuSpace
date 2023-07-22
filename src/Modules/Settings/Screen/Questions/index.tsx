import React from 'react'
import { Button, Card, NoDataFound } from '@Components'
import { useNavigation, useWindowDimensions } from '@Hooks'
import { ROUTES } from '@Routes'
import { icons } from '@Assets';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionForm } from '@Redux';

function Questions() {

    const { goTo } = useNavigation();
    const dispatch = useDispatch()
    const { height } = useWindowDimensions()
    const { selectedGroupId ,questionForm} = useSelector((state: any) => state.DashboardReducer)
    const {name,description} = questionForm || {}

    console.log('333333333333',questionForm)

    const getQuestionsFormApi = () => {

        const params = {
            knowledge_group_variant_id: selectedGroupId?.id
        };

        dispatch(
            getQuestionForm({
                params,
                onSuccess: (response: any) => (response) => {console.log('111111111111---->',response)
                },
                onError: (error) => () => {
                },
            })
        );
    }

    return (
        <>
            <div className="mt-3">
                <Card className="m-3" style={{ height: height - 30 }}>
                    <div className="d-flex justify-content-end">
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

                    <div className="row mt-3 mb-2">
                        <div className="mx-3 col">

                        </div>
                    </div>
                </Card>

            </div>
        </>
    )
}

export { Questions }