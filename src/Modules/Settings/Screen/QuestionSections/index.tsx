import React, { useEffect, useState } from 'react'
import { Back, Button, Card, Checkbox, Divider, Input, Modal } from '@Components'
import { ROUTES } from '@Routes';
import { useInput, useLoader, useModal, useNavigation, useWindowDimensions } from '@Hooks'
import { useSelector, useDispatch } from 'react-redux';
import { fetchGenerateFormSectionsAndQuestions, fetchGenerateSectionQuestions, getFormSectionQuestions, getQuestionSection } from '@Redux';

function QuestionSections() {

    const { goTo } = useNavigation();
    const { height } = useWindowDimensions()
    const dispatch = useDispatch()
    const { selectedRole, selectedQuestionForm, questionSection, formSectionQuestions } = useSelector((state: any) => state.DashboardReducer)
    const generateFormSectionsAndQuestionsModel = useModal(false);
    const generateQuestionsModel = useModal(false);

    const [includeQuestions, setIncludeQuestions] = useState(true)
    const [selectedSectionId, SetSelectedSectionId] = useState('')

    const sectionCount = useInput("");
    const questionCount = useInput("");
    const noOfQuestions = useInput("");
    const generateFormSectionsAndQuestionsLoader = useLoader(false);
    const generateQuestionsLoader = useLoader(false);




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



    const generateFormSectionsAndQuestionsApiHandler = (add: boolean) => {
        const params = {
            id: selectedQuestionForm?.id,
            ...(add ? { regenerate: false } : { regenerate: true }),
            sections_count: sectionCount.value,
            ... (includeQuestions && { questions_count: noOfQuestions.value }),
            generate_questions: includeQuestions
        };
        generateFormSectionsAndQuestionsLoader.show()
        dispatch(
            fetchGenerateFormSectionsAndQuestions({
                params,
                onSuccess: () => () => {
                    generateFormSectionsAndQuestionsModel.hide()
                    sectionCount.set('')
                    noOfQuestions.set('')
                    generateFormSectionsAndQuestionsLoader.hide()
                },
                onError: () => () => {
                    generateFormSectionsAndQuestionsLoader.hide()
                },
            })
        );
    }


    const generateSectionQuestionsHandler = () => {
        const params = {
            regenerate: true,
            questions_count: questionCount.value,
            id: selectedSectionId
        };
        generateQuestionsLoader.show()
        dispatch(
            fetchGenerateSectionQuestions({
                params,
                onSuccess: () => () => {
                    questionCount.set('')
                    generateQuestionsLoader.hide()
                },
                onError: () => () => {
                    generateQuestionsLoader.hide()
                },
            })
        );
    }


    return (

        <div className="m-3">
            {/* <div className="row">
                <div className="col text-right">
                    <Button
                        text={'Create'}
                        className="text-white"
                        onClick={() => {
                            goTo(ROUTES['designation-module']['weightage-count-form'])
                        }}
                    />
                </div>
            </div> */}

            <div className="row mt-2">

                <div className="col-4">
                    {questionSection && questionSection?.length > 0 && <Card className={'mr--2'} style={{ height: height - 74 }}>
                        <h4 className='mb-0 pointer'>{'Sections'}</h4>
                        <div className={'mx--4'}><Divider space={'3'} /></div>
                        <Card className={'overflow-auto overflow-hide shadow-none mx--4'} style={{ height: height - 153 }}>
                            {questionSection && questionSection?.length > 0 && questionSection?.map((section: any, index: number) => {
                                const { id, name, description } = section;
                                return (
                                    <div key={index}
                                        onClick={() => {
                                            getFormSectionQuestionsApi(id)
                                            SetSelectedSectionId(id)
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
                    </Card>}
                </div>
                {
                    <div className="col-8">
                        <Card className={'overflow-auto overflow-hide ml--1'} style={{ height: height - 74 }}>
                            <h4 className='mb-0 pointer'>{'Questions'}</h4>
                            <div className={'mx--4'}><Divider space={'3'} /></div>
                            <Card className={'overflow-auto overflow-hide shadow-none mx--4'} style={{ height: height - 153 }}>
                                {formSectionQuestions && formSectionQuestions?.length > 0 ? formSectionQuestions?.map((sectionQuestions: any, index: number) => {
                                    const { question, expected_answer } = sectionQuestions;
                                    return (
                                        <div key={index}>
                                            <div className={'row'}>
                                                <h4 className='col mb-0 pointer'>{question}:</h4>
                                                <i className="fas fa-pen col-auto" onClick={() => { }} ></i>
                                            </div>
                                            <div className='mx-3 my-2'>
                                                <span>{expected_answer}</span>
                                            </div>
                                            {index !== formSectionQuestions?.length - 1 && <Divider space={'3'} />}
                                        </div>
                                    )
                                }) : <div className='d-flex align-items-center justify-content-center'>
                                    <Button
                                        text={'Generate Questions'}
                                        className="text-white"
                                        onClick={() => {
                                            generateQuestionsModel.show()
                                        }}
                                    /></div>}
                            </Card>
                        </Card>
                    </div>}
            </div>
            {questionSection && questionSection?.length === 0 &&
                <div className='h-100vh d-flex align-items-center justify-content-center'>
                    <Button
                        text={'Create'}
                        className="text-white"
                        onClick={() => {
                            goTo(ROUTES['designation-module']['weightage-count-form'])
                        }}
                    />
                    <Button
                        text={'Generate'}
                        className="text-white"
                        onClick={() => {
                            generateFormSectionsAndQuestionsModel.show()
                        }}
                    />
                </div>}
            < Modal size={'lg'} title={"Generate"} isOpen={generateFormSectionsAndQuestionsModel.visible} onClose={generateFormSectionsAndQuestionsModel.hide} >
                <Input
                    className={'col-6'}
                    heading={"Section Count"}
                    value={sectionCount.value}
                    onChange={sectionCount.onChange}
                />
                <Checkbox
                    id={'1'}
                    defaultChecked={includeQuestions}
                    text={'Include Questions'}
                    onCheckChange={
                        setIncludeQuestions
                    }
                />
                {includeQuestions && <Input
                    className={'col-6'}
                    heading={"No Of Question"}
                    value={noOfQuestions.value}
                    onChange={noOfQuestions.onChange}
                />
                }
                <div className="col text-right">
                    <Button size={'md'}
                        loading={generateFormSectionsAndQuestionsLoader.loader}
                        text={"Submit"}
                        onClick={() => generateFormSectionsAndQuestionsApiHandler(true)}
                    />
                </div>
            </Modal >
            < Modal size={'md'} title={"Generate"} isOpen={generateQuestionsModel.visible} onClose={generateQuestionsModel.hide} >
                <Input
                    className={'col-8'}
                    heading={"Question Count"}
                    value={questionCount.value}
                    onChange={questionCount.onChange}
                />

                <div className="col text-right">
                    <Button size={'md'}
                        loading={generateQuestionsLoader.loader}
                        text={"Submit"}
                        onClick={() => generateSectionQuestionsHandler()}
                    />
                </div>
            </Modal >
        </div>
    )
}

export { QuestionSections }