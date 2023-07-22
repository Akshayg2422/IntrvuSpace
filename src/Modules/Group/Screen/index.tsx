import { Button, Modal, Input, CommonTable, NoDataFound, Card, DropDown, NoRecordsFound, Spinner, DragAndReorder } from '@Components';
import { useDynamicHeight, useInput, useLoader, useModal, useNavigation } from '@Hooks'
import { createKnowledgeGroup, createKnowledgeGroupVariant, getKnowledgeGroup, getKnowledgeGroupVariant } from '@Redux';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { translate } from "@I18n";


function Group() {
    const { GroupDetails } = useSelector((state: any) => state.DashboardReducer);

    const title = useInput("");
    const description = useInput("");
    const { goTo } = useNavigation()
    const editModal = useModal(false);
    const variantModal = useModal(false);
    const dispatch = useDispatch()
    const dynamicHeight: any = useDynamicHeight()
    const GroupSubmitLoader = useLoader(false);
    const [showGroup, setShowGroup] = useState(false);
    const VariantSubmitLoader = useLoader(false);
    const [selectedGroupDetails, setSelectedGroupDetails] = useState<any>({})
    const [convertedGroupDetails, setConvertedGroupDetails] = useState<any>([])
    const [selectedGroup, setSelectedGroup] = useState<any>(undefined);
    const [dragAndReorderData, setDragAndReorder] = useState<any>([
        {id:1, name: 'Full stack development with React', description: 'Minimum 1 year experience in full stack development with React.', weightage: '15', display_order: '1' },
        {id:2, name: 'Front-end UI integration with API', description: 'Knowledge about integrating front-end UI with the constructed API.', weightage: '10', display_order: '2' },
        {id:3, name: 'NodeJS', description: 'Mandatory skill in NodeJS.', weightage: '10', display_order: '3' },
        // {id:4, name: 'ReactJS', description: 'Mandatory skill in ReactJS.', weightage: '10', display_order: '4' },
        // {id:5, name: 'ExpressJS', description: 'Mandatory skill in ExpressJS.', weightage: '5', display_order: '5' },
        // {id:6, name: 'AngularJS', description: 'Mandatory skill in AngularJS.', weightage: '5', display_order: '6' },
        // {id:7, name: 'RESTful web services', description: 'Professional exposure to RESTful web services.', weightage: '5', display_order: '7' },
        // {id:8, name: 'JavaScript development with React', description: 'Functional and object oriented JavaScript development including application development with React.', weightage: '10', display_order: '8' },
        // {id:9, name: 'Databases', description: 'Knowledge of databases like MySQL, PostgreSQL, MongoDB.', weightage: '5', display_order: '9' },
        // {id:10, name: 'Front-end development tools', description: 'Experience with common front-end development tools such as Babel, Webpack, NPM, etc.', weightage: '10', display_order: '10' },
        // {id:11, name: 'Business requirements translation', description: 'Ability to understand business requirements and translate them into technical requirements.', weightage: '5', display_order: '11' },
        // {id:12, name: 'Code versioning tools', description: 'Familiarity with code versioning tools (such as Git).', weightage: '5', display_order: '12' }
    ])

    // createKnowledgeGroupVariant
    useEffect(() => {
        getKnowledgeGroupDetails()
        getKnowledgeGroupVariantDetails()
    }, [])

    const getKnowledgeGroupDetails = () => {
        const params = {}
        dispatch(
            getKnowledgeGroup({
                params,
                onSuccess: (success: any) => () => {
                    const normalizedArray = success?.details?.knowledege_groups && success?.details?.knowledege_groups.length > 0
                        && success.details.knowledege_groups.map((el: any) => {
                            let requiredObject = { show: false }
                            return { ...el, ...requiredObject }
                        })

                    setConvertedGroupDetails(normalizedArray)
                },
                onError: (error: string) => () => {
                },
            })
        );
    };

    const getKnowledgeGroupVariantDetails = () => {
        const params = {}
        dispatch(
            getKnowledgeGroupVariant({
                params,
                onSuccess: (success: any) => () => {

                },
                onError: (error: string) => () => {
                },
            })
        );
    };






    const createKnowledgeGroupDetails = () => {
        GroupSubmitLoader.show()

        const params = {
            name: title?.value,
            description: description?.value
        };

        dispatch(
            createKnowledgeGroup({
                params,
                onSuccess: (success: any) => () => {
                    GroupSubmitLoader.hide()
                    variantModal.hide()
                },
                onError: (error: string) => () => {
                    GroupSubmitLoader.hide()
                },
            })
        );
    };

    const createKnowledgeGroupVariantDetails = () => {
        VariantSubmitLoader.show()

        const params = {
            name: title?.value,
            description: description?.value,
            knowledge_group_id: selectedGroupDetails?.id
        };


        dispatch(
            createKnowledgeGroupVariant({
                params,
                onSuccess: (success: any) => () => {
                    VariantSubmitLoader.hide()
                    variantModal.hide()
                    getKnowledgeGroupDetails()

                },
                onError: (error: string) => () => {
                    VariantSubmitLoader.hide()
                },
            })
        );
    };

    const onClickAddVariant = (group: any) => {
        setSelectedGroupDetails(group)
        variantModal.show()
    }


    function onSubmitDnd(params: any, key: string) {
        // courseSectionModalLoader.showLoader()
        // dispatch(postGenericBatchCrudDetails({
        //   params,
        //   onSuccess: (success: any) => () => {
        //     if (key === 'courseSection') {
        //       courseSectionModalLoader.hideLoader()
        //       showToast('success', success.message)
        //       dispatch(handleDndModal(true))
        //       getCourses()

        //     }
        //     else if (key === 'courseTopic') {
        //       courseSectionModalLoader.hideLoader()
        //       showToast('success', success.message)
        //       dispatch(handleDndModal(true))
        //       getCourseTopics(currentCourseSection)
        //     }
        //     else {
        //       modal.onChange(!modal.visible)
        //       courseSectionModalLoader.hideLoader()
        //       showToast('success', success.message)
        //       dispatch(handleDndModal(false))
        //       getCourseTopics(currentCourseSection)

        //     }

        //   },
        //   onError: (error: any) => () => {
        //     courseSectionModalLoader.hideLoader()
        //     dispatch(handleDndModal(true))
        //   }
        // }))
    }

    // const normalizedTaskGroupData = (data: any) => {
    //     return data.map((taskGroup: any,) => {



    //         return {
    //             name: <div className="row  align-items-center">
    //                 <div className="pl-3">
    //                     <span className={`${marked_as_closed && 'text-primary'}`}>{name}</span>
    //                     <br></br>
    //                     {!is_parent && <small> {parent.name}</small>}
    //                 </div>
    //             </div >,
    //             tag: code,
    //             // "": <MenuBar menuData={getGroupMenuItem(marked_as_closed, is_parent)} onClick={(el) => {
    //             //   if (el.id === '0') {
    //             //     if (is_parent) {
    //             //       addTaskGroupModal.show()
    //             //       setSelectedTaskGroup(taskGroup)
    //             //       const { name, description, code, photo } = taskGroup
    //             //       taskGroupName.set(name)
    //             //       taskGroupDescription.set(description)
    //             //       taskGroupCode.set(code)
    //             //       setPhoto(getPhoto(photo))

    //             //     } else {
    //             //       addSubTaskGroupModal.show()
    //             //       setSelectedSubTaskGroup(taskGroup)
    //             //       const { name, description, code, photo, start_time, end_time } = taskGroup
    //             //       subTaskGroupName.set(name)
    //             //       subTaskGroupDescription.set(description)
    //             //       subTaskGroupCode.set(code)
    //             //       setSubTaskPhoto(getPhoto(photo))
    //             //       setStatTimeEta(start_time)
    //             //       setEndTimeEta(end_time)
    //             //       setIsEdit(true)
    //             //     }
    //             //   }
    //             //   else if (el.id === '1') {
    //             //     addSubTaskGroupModal.show();
    //             //     setIsEdit(false)
    //             //     setSelectedSubTaskGroup(taskGroup)
    //             //   }
    //             //   else if (el.id === '2') {
    //             //     const { id } = taskGroup
    //             //     changeGroupStatusApiHandler(id, true)
    //             //   }
    //             //   else if (el.id === '3') {
    //             //     const { id } = taskGroup
    //             //     changeGroupStatusApiHandler(id, false)
    //             //   }
    //             //   else if (el.id === '4') {
    //             //     const { id } = taskGroup

    //             //     // addGroupUsers(id)
    //             //     addMemberModal.show()
    //             //     setGroupId(taskGroup.id)

    //             //   }
    //             // }} 
    //             // />

    //         };
    //     });
    // };

    return (
        <div>
            <div className="row justify-content-end m-2 mb-3">
                <Button
                    className={'text-white shadow-none'}
                    size={'sm'}
                    text={"Add Group"}
                    onClick={() => {
                        editModal.show()
                    }}
                />
            </div>
            <div className='mx-3'>
                <div className='row'>
                    {convertedGroupDetails?.knowledege_groups && convertedGroupDetails?.knowledege_groups.length > 0 ?
                        convertedGroupDetails?.knowledege_groups.map((el: any) => {
                            return (
                                <div className={'card col justify-content-center m-3'} style={{ height: el?.show ? dynamicHeight.dynamicHeight : '5em' }}>
                                    <div className="row justify-content-center align-items-center mx-2" >
                                        <div className="col">
                                            <h3>{el.name}</h3>
                                        </div>
                                        <div className="text-right mr-3">
                                            <Button
                                                className={'text-white'}
                                                text={
                                                    el?.show
                                                        ? translate("course.hide")
                                                        : translate("course.view")
                                                }
                                                size={"sm"}
                                                onClick={() => {
                                                    setShowGroup(!showGroup)
                                                    if (!showGroup) {
                                                        // getGroupList(taskGroupCurrentPages);
                                                        // getKnowledgeGroupDetails()
                                                    }

                                                }}
                                            />
                                            <Button
                                                className={'text-white'}
                                                text={translate("product.addItem")}
                                                size={"sm"}
                                                onClick={() => {
                                                    setSelectedGroup(undefined)
                                                    // addTaskGroupModal.show()
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })

                        : <div className={'d-flex justify-content-center align-items-center'} style={{ height: '90vh' }}><NoDataFound text={"No Data Found"} /></div>
                    }
                </div>
            </div>
            < Modal size={'lg'} title={"Add Group"} isOpen={editModal.visible} onClose={editModal.hide} >
                <div className="col-md-9 col-lg-5">
                    <div className="mt--2">
                        <Input

                            heading={"Name"}
                            value={title.value}
                            onChange={title.onChange}
                        />
                    </div>
                    <div className="mt--2">
                        <Input
                            heading={"Description"}
                            value={description.value}
                            onChange={description.onChange}
                        />
                    </div>
                </div>
                <div className="col text-right ">
                    <Button size={'md'}
                        loading={GroupSubmitLoader.loader}
                        text={"Submit"}
                        onClick={() => createKnowledgeGroupDetails()} />
                </div>
            </Modal >

            < Modal size={'lg'} title={"Add Variant"} isOpen={variantModal.visible} onClose={variantModal.hide} >
                <div className="col-md-9 col-lg-5">
                    <div className="mt--2">
                        <Input
                            heading={"Name"}
                            value={title.value}
                            onChange={title.onChange}
                        />
                    </div>
                    <div className="mt--2">
                        <Input
                            heading={"Description"}
                            value={description.value}
                            onChange={description.onChange}
                        />
                    </div>
                </div>
                <div className="col text-right">
                    <Button size={'md'}
                        loading={VariantSubmitLoader.loader}
                        text={"Submit"}
                        onClick={() => createKnowledgeGroupVariantDetails()}
                    />
                </div>
            </Modal >
            {/* <DragAndReorder
                title={'testing'}
                isDndModalOpen={!true}
                dndData={dragAndReorderData}
                onSubmitClick={(topic) => {
                    const params = {
                        mq: "course__Topic",
                        data: topic
                    }

                    console.log("000000000000",topic)
                    onSubmitDnd(params, "courseTopic")
                }}
            /> */}
        </div >
    )
}

export { Group }
