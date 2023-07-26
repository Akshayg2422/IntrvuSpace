import React, { useEffect, useState } from 'react'
import { Back, Button, Card, Divider } from '@Components'
import { ROUTES } from '@Routes';
import { useNavigation, useWindowDimensions } from '@Hooks'
import { useSelector, useDispatch } from 'react-redux';
import { getFormSectionQuestions, getQuestionSection } from '@Redux';

function QuestionSections() {

    const { goTo } = useNavigation();
    const { height } = useWindowDimensions()
    const dispatch = useDispatch()
    const { selectedRole, selectedQuestionForm, questionSection, formSectionQuestions } = useSelector((state: any) => state.DashboardReducer)

    useEffect(() => {
        getQuestionSectionsApi()
    }, [])

    const getQuestionSectionsApi = () => {
        const params = {
            question_form_id: selectedQuestionForm?.id
        };

        dispatch(
            getQuestionSection({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {
                },
            })
        );
    }



    const getFormSectionQuestionsApi = (id: string) => {
        const params = {
            section_id: id
        };

        dispatch(
            getFormSectionQuestions({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {
                },
            })
        );
    }
    console.log('formSectionQuestions--->',formSectionQuestions)

    return (

        <div className="m-3">
            <div className="row">
                <div className="col text-right">
                    <Button
                        text={'Create'}
                        className="text-white"
                        onClick={() => {
                            goTo(ROUTES['group-module']['weightage-count-form'])
                        }}
                    />
                </div>
            </div>

            <div className="row mt-2">

                <div className="col-4">
                    <Card className={'mr--2'} style={{ height: height - 74 }}>
                        <h4 className='mb-0 pointer'>{'Sections'}</h4>
                        <div className={'mx--4'}><Divider space={'3'} /></div>
                        <Card className={'overflow-auto overflow-hide shadow-none mx--4'} style={{ height: height - 153 }}>
                            {questionSection && questionSection?.length > 0 && questionSection?.map((section: any, index: number) => {
                                const { id, name, description } = section;
                                return (
                                    <div key={index}
                                        onClick={() => {
                                            getFormSectionQuestionsApi(id)
                                        }}
                                    >
                                        <div className={'row'}>
                                            <small className='col mb-0 pointer'>{name}:</small>
                                        </div>
                                        <div className={'row'}>
                                            <small className='col mb-0 pointer'>{description}:</small>
                                        </div>
                                        {index !== questionSection?.length - 1 && <Divider space={'3'} />}
                                    </div>
                                )
                            })}
                        </Card>
                    </Card>
                </div>
                <div className="col-8">
                    <Card className={'overflow-auto overflow-hide ml--1'} style={{ height: height - 74 }}>
                        <h4 className='mb-0 pointer'>{'Questions'}</h4>
                        <div className={'mx--4'}><Divider space={'3'} /></div>
                        <Card className={'overflow-auto overflow-hide shadow-none mx--4'} style={{ height: height - 153 }}>
                            {formSectionQuestions && formSectionQuestions?.length > 0 && formSectionQuestions?.map((sectionQuestions: any, index: number) => {
                                
                                const { question } = sectionQuestions;
                                return (
                                    <div key={index}>
                                        <div className={'row'}>
                                            <small className='col mb-0 pointer'>{question}:</small>
                                        </div>

                                        {index !== formSectionQuestions?.length - 1 && <Divider space={'3'} />}
                                    </div>
                                )
                            })}
                        </Card>
                    </Card>
                </div>

            </div>

        </div>
    )
}

export { QuestionSections }