import { Button, Modal, Input, CommonTable, NoDataFound, Card, DropDown, NoRecordsFound, Spinner } from '@Components';
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
        </div >
    )
}

export { Group }
