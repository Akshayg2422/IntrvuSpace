import { Button, Modal, Input, CommonTable, NoDataFound, Card, DropDown, NoRecordsFound, Spinner, MenuBar } from '@Components';
import { useDynamicHeight, useInput, useLoader, useModal, useNavigation } from '@Hooks'
import { createKnowledgeGroup, createKnowledgeGroupVariant, getKnowledgeGroup, getKnowledgeGroupVariant, selectedGroupIds } from '@Redux';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { translate } from "@I18n";
import { icons } from '@Assets';
import { ROUTES } from '@Routes';
import { stringify } from 'querystring';


function Group() {
    const title = useInput("");
    const description = useInput("");
    const variantTitle = useInput("");
    const variantDescription = useInput("");
    const { goTo } = useNavigation()
    const editModal = useModal(false);
    const variantModal = useModal(false);
    const dispatch = useDispatch()
    const dynamicHeight: any = useDynamicHeight()
    const GroupSubmitLoader = useLoader(false);
    const [variant, setVariant] = useState<any>();
    const [editVariant, setEditVariant] = useState(undefined)
    const VariantSubmitLoader = useLoader(false);
    const [selectedGroupDetails, setSelectedGroupDetails] = useState<any>({})
    const [convertedGroupDetails, setConvertedGroupDetails] = useState<any>([])
    const [selectedGroupVariant, setSelectedGroupVariant] = useState<any>();
    const MENU = [{ id: '0', name: "Edit", icon: icons.edit }]


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
                    // filteredGroupDetails(success.details)
                    setVariant(success.details)
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
                    editModal.hide()
                    getKnowledgeGroupDetails()
                    getKnowledgeGroupVariantDetails()
                    title.set('')
                    description.set('')
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
            name: variantTitle?.value,
            description: variantDescription?.value,
            knowledge_group_id: selectedGroupDetails?.id
        };
        dispatch(
            createKnowledgeGroupVariant({
                params,
                onSuccess: (success: any) => () => {
                    VariantSubmitLoader.hide()
                    variantModal.hide()
                    getKnowledgeGroupDetails()
                    getKnowledgeGroupVariantDetails()
                    variantTitle.set('')
                    variantDescription.set('')
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

    const onClickShow = (item: any, index: number) => {
        let showVariant = convertedGroupDetails.map((el: any, i: number) => {
            return {
                ...el,
                show: i === index ? !el.show : false
            };
        });
        setConvertedGroupDetails(showVariant);
    };


    const selectedVariant = (el: any) => {
        let filteredVariant: any = []
        variant && variant?.knowledge_group_varaiant.length > 0 && variant.knowledge_group_varaiant.map((element: any) => {
            if (element?.knowledge_group?.id === el.id) {
                filteredVariant = [...filteredVariant, element]
            }
        })
        setSelectedGroupVariant(filteredVariant)
    }

    const editVariantHandler = (item: any) => {
        console.log("edit variant", item);

    }

    const normalizedTaskGroupData = (data: any) => {
        return data && data.length > 0 && data.map((variant: any) => {
            return {
                name: <div className="row  align-items-center">
                    <div className="pl-3">
                        <span className={`'text-primary'}`}>{variant?.name}</span>
                    </div>
                </div >,
                "": <MenuBar menuData={MENU} onClick={(el) => {
                    if (el.id === 0) {
                        editVariantHandler(variant)
                    }
                }}
                />
            }
        })
    };

    return (
        <>
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
                        {convertedGroupDetails && convertedGroupDetails.length > 0 ?
                            convertedGroupDetails.map((el: any, index: number) => {
                                return (
                                    <div className={'card col mx-1 py-3'} style={{ height: el.show ? dynamicHeight.dynamicHeight : '5em' }}>
                                        <div className="row justify-content-center  m-2" >
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
                                                        onClickShow(el, index)
                                                        selectedVariant(el)
                                                    }}
                                                />
                                                <Button
                                                    className={'text-white'}
                                                    text={translate("product.addItem")}
                                                    size={"sm"}
                                                    onClick={() => {
                                                        onClickAddVariant(el)
                                                        // addTaskGroupModal.show()
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        {el.show && selectedGroupVariant && selectedGroupVariant.length > 0 && (
                                            <CommonTable
                                                isPagination
                                                displayDataSet={normalizedTaskGroupData(selectedGroupVariant)}
                                                tableDataSet={selectedGroupVariant}
                                                tableOnClick={(index, id, item) => {
                                                    console.log('---->',item)
                                                    dispatch(selectedGroupIds(item))
                                                    goTo(ROUTES["group-module"].CREATEQUESTIONFORM)
                                                }}
                                            />
                                        )
                                            // : 
                                            // <div className="h-100 d-flex justify-content-center align-items-center">
                                            //     <NoRecordsFound />
                                            // </div>
                                        }
                                    </div>
                                )
                            })
                            : <div className={'d-flex  col justify-content-center align-items-center'} style={{ height: '90vh' }}><NoDataFound text={"No Data Found"} /></div>
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
                                value={variantTitle.value}
                                onChange={variantTitle.onChange}
                            />
                        </div>
                        <div className="mt--2">
                            <Input
                                heading={"Description"}
                                value={variantDescription.value}
                                onChange={variantDescription.onChange}
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
        </>
    )
}

export { Group }
