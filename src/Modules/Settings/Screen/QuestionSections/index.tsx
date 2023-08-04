import React, { useEffect, useState } from 'react'
import { Back, Breadcrumbs, Button, Card, Checkbox, Divider, Input, Modal, TextArea } from '@Components'
import { ROUTES } from '@Routes';
import { useInput, useLoader, useModal, useNavigation, useWindowDimensions } from '@Hooks'
import { useSelector, useDispatch } from 'react-redux';
import { clearBreadCrumbs, fetchGenerateFormSectionsAndQuestions, fetchGenerateSectionQuestions, fetchUpdateQuestionDetails, getFormSectionQuestions, getQuestionSection } from '@Redux';
import { CardFooter } from 'reactstrap';

function QuestionSections() {

    const { goTo, goBack } = useNavigation();
    const { height } = useWindowDimensions()
    const dispatch = useDispatch()
    const { selectedRole, selectedQuestionForm, questionSection, breadCrumb } = useSelector((state: any) => state.DashboardReducer)
    const generateFormSectionsAndQuestionsModel = useModal(false);
    const generateQuestionsModel = useModal(false);
    const editQuestionsModel = useModal(false);


    const [includeQuestions, setIncludeQuestions] = useState(true)
    const [selectedSectionId, SetSelectedSectionId] = useState('')
    const [selectedSectionsDetails, setSelectedSectionDetails] = useState([])
    const [selectedEditQuestionId, setSelectedEditQuestionId] = useState('')

    const sectionCount = useInput("");
    const questionCount = useInput("");
    const noOfQuestions = useInput("");
    const question = useInput("");
    const expectedAnswer = useInput("");

    const generateFormSectionsAndQuestionsLoader = useLoader(false);
    const generateQuestionsLoader = useLoader(false);
    const editQuestionsLoader = useLoader(false);


    console.log('breadCrumb-------->', breadCrumb)



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
                onSuccess: (response: any) => () => {
                    const { sections } = response.details
                    sections && sections.length > 0 && getFormSectionQuestionsApi(sections[0]?.id)
                    sections && sections.length > 0 && SetSelectedSectionId(sections[0]?.id)
                },
                onError: () => () => {
                },
            })
        );
    }



    const getFormSectionQuestionsApi = (id: string) => {
        setSelectedSectionDetails([])
        const params = {
            section_id: id
        };

        dispatch(
            getFormSectionQuestions({
                params,
                onSuccess: (success: any) => () => {
                    setSelectedSectionDetails(success?.details?.questions)
                },
                onError: () => () => {
                },
            })
        );
    }



    const generateFormSectionsAndQuestionsApiHandler = () => {
        const params = {
            id: selectedQuestionForm?.id,
            regenerate: true,
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
                    getQuestionSectionsApi()
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
                    generateQuestionsModel.hide()
                    getFormSectionQuestionsApi(selectedSectionId)
                },
                onError: () => () => {
                    generateQuestionsLoader.hide()
                    generateQuestionsModel.hide()
                },
            })
        );
    }

    const SelectedQuestionsEditHandler = (items: any) => {
        setSelectedEditQuestionId(items?.id)
        question.set(items?.question)
        expectedAnswer.set(items.expected_answer)
        editQuestionsModel.show()
    }

    const editQuestionsApiHandler = () => {
        const params = {
            id: selectedEditQuestionId,
            question: question.value,
            expected_answer: expectedAnswer.value
        };
        editQuestionsLoader.show()
        dispatch(
            fetchUpdateQuestionDetails({
                params,
                onSuccess: () => () => {
                    question.set('')
                    expectedAnswer.set('')
                    editQuestionsLoader.hide()
                    editQuestionsModel.hide()
                    getQuestionSectionsApi()
                    getFormSectionQuestionsApi(selectedSectionId)
                },
                onError: () => () => {
                    editQuestionsLoader.hide()
                    editQuestionsModel.hide()
                },
            })
        );
    }

    const breadcrumbString = breadCrumb.length > 0 && breadCrumb;

    return (
        <>
            <span className='pointer ml-3 text-black h3 '
                onClick={() => { goBack() }}
            >
                <i className="bi bi-arrow-left text-black fa-lg font-weight-bolder pr-1"></i>  {breadcrumbString}
            </span>
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
                        {questionSection && questionSection?.length > 0 &&
                            <Card className={'mr--2'} style={{ height: height - 74 }}>
                                <div className={'row justify-content-between mt--1'}>
                                    <h4 className='mb-0 pointer'>{'Sections'}</h4>
                                    <span className={''}>
                                        <Button text={'Regenerate'} className={'text-white'} size={'sm'} onClick={() => { generateFormSectionsAndQuestionsModel.show() }} />
                                    </span>
                                </div>

                                <div className={'mx--4'}><Divider space={'3'} /></div>
                                <Card className={'overflow-auto overflow-hide shadow-none mx--4 mt--3'} style={{ height: height - 153 }}>
                                    {questionSection && questionSection?.length > 0 && questionSection?.map((section: any, index: number) => {
                                        const { id, name, description } = section;
                                        return (
                                            <div className={'mt--2 p-0 m-0'} key={index}
                                                onClick={() => {
                                                    getFormSectionQuestionsApi(id)
                                                    SetSelectedSectionId(id)
                                                }}
                                            >
                                                <div className={'row'}>
                                                    <h4 className='col mb-0 pointer'
                                                        style={{
                                                            color: selectedSectionId === id ? '#68d75c' : ''
                                                        }}
                                                    >{name}:</h4>
                                                </div>
                                                <div className={'row'}>
                                                    <small className='col mb-0 pointer'>{description}:</small>
                                                </div>
                                                {index !== questionSection?.length - 1 && <div className={'mx--4'}><Divider space={'3'} /></div>}
                                            </div>
                                        )
                                    })}
                                </Card>
                            </Card>}
                    </div>
                    {questionSection && questionSection?.length > 0 &&
                        <div className="col-8">
                            <Card className={'overflow-auto overflow-hide ml--1'} style={{ height: height - 74 }}>
                                <div className='row justify-content-between mt--1'>
                                    <h4 className='mb-0 pointer'>{'Questions'}</h4>
                                    <span className={''}>
                                        {selectedSectionsDetails && selectedSectionsDetails?.length > 0 && <Button text={'Regenerate'} className={'text-white'} size={'sm'} onClick={() => { generateQuestionsModel.show() }} />}
                                    </span>
                                </div>
                                <div className={'mx--4'}><Divider space={'3'} /></div>
                                <Card className={'overflow-auto overflow-hide shadow-none mt--3 mx--4'} style={{ height: height - 153 }}>
                                    {selectedSectionsDetails && selectedSectionsDetails?.length > 0 ? selectedSectionsDetails?.map((sectionQuestions: any, index: number) => {
                                        const { id, question, expected_answer } = sectionQuestions;
                                        return (
                                            <div key={index} >
                                                <div className={'row'}>
                                                    <h4 className='col mb-0 pointer'>{question}:</h4>
                                                    <i className="fas fa-pen col-auto pointer   " onClick={() => { SelectedQuestionsEditHandler(sectionQuestions) }} ></i>
                                                </div>
                                                <div className='mx-3 my-2'>
                                                    <span>{expected_answer}</span>
                                                </div>
                                                {index !== selectedSectionsDetails?.length - 1 && <div className={'mx--4'}><Divider space={'3'} /></div>}
                                            </div>
                                        )
                                    }) : <div className='d-flex align-items-center justify-content-center'>
                                        <Button
                                            text={'Generate Questions'}
                                            className="text-white"
                                            onClick={() => {
                                                generateQuestionsModel.show()
                                            }}
                                        />
                                    </div>}
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
                            onClick={() => generateFormSectionsAndQuestionsApiHandler()}
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
                < Modal size={'lg'} title={"Generate"} isOpen={editQuestionsModel.visible} onClose={editQuestionsModel.hide} >
                    <CardFooter className={'mx--4 mt--4'}>
                        <TextArea
                            className={'col-8'}
                            heading={"Question"}
                            value={question.value}
                            onChange={question.onChange}
                        />

                        <TextArea
                            heading='Expected Answer'
                            className={'col-8'}
                            value={expectedAnswer.value}
                            onChange={expectedAnswer.onChange}
                        />

                        <div className="col text-right">
                            <Button size={'md'}
                                loading={editQuestionsLoader.loader}
                                text={"Submit"}
                                onClick={() => editQuestionsApiHandler()}
                            />
                        </div>
                    </CardFooter>
                </Modal >
            </div>
        </>
    )
}

export { QuestionSections }