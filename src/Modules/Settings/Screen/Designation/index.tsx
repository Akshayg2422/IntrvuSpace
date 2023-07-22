import { icons } from '@Assets';
import { Button, CommonTable, DropDown, Input, MenuBar, Modal, NoDataFound } from '@Components';
import { useDropDown, useDynamicHeight, useInput, useLoader, useModal, useNavigation } from '@Hooks';
import { translate } from "@I18n";
import { createKnowledgeGroup, createKnowledgeGroupVariant, getKnowledgeGroups, getKnowledgeGroupVariant, getSectors, selectedGroupIds } from '@Redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDropDownCompanyDisplayData } from '@Utils';
import { ROUTES } from '@Routes';


function Designation() {


    const { knowledgeGroups, sectors } = useSelector((state: any) => state.DashboardReducer)
    const { goTo } = useNavigation()
    const title = useInput("");
    const description = useInput("");
    const editModal = useModal(false);
    const variantModal = useModal(false);
    const dispatch = useDispatch()
    const dynamicHeight: any = useDynamicHeight()
    const GroupSubmitLoader = useLoader(false);
    const [variant, setVariant] = useState<any>();
    const VariantSubmitLoader = useLoader(false);
    const [selectedGroupDetails, setSelectedGroupDetails] = useState<any>({})
    const [convertedGroupDetails, setConvertedGroupDetails] = useState<any>([])
    const [selectedGroup, setSelectedGroup] = useState<any>(undefined);
    const [selectedGroupVariant, setSelectedGroupVariant] = useState<any>();
    const MENU = [{ id: 0, name: "Edit", icon: icons.edit }]


    const sector = useDropDown({});

    useEffect(() => {
        getKnowledgeGroupDetailsApiHandler();
        getKnowledgeGroupVariantDetails();
        getSectorsApiHandler();
    }, [])

    const getKnowledgeGroupDetailsApiHandler = () => {
        const params = {}
        dispatch(
            getKnowledgeGroups({
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
                    setVariant(success.details)
                },
                onError: (error: string) => () => {
                },
            })
        );
    };


    const getSectorsApiHandler = () => {
        const params = {}
        dispatch(
            getSectors({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {
                },
            })
        );
    };

    const createKnowledgeGroupDetails = () => {
        GroupSubmitLoader.show()

        const params = {
            name: title?.value,
            description: description?.value,
            sector_id: sector.value?.id
        };

        dispatch(
            createKnowledgeGroup({
                params,
                onSuccess: (success: any) => () => {
                    GroupSubmitLoader.hide()
                    editModal.hide()
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
                    getKnowledgeGroupDetailsApiHandler()
                    getKnowledgeGroupVariantDetails()
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
                        // editVariant(variant)
                        // onClickAddVariant(variant)
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
                    <Button
                        className={'text-white shadow-none'}
                        size={'sm'}
                        text={"Sector"}
                        onClick={() => {
                            goTo(ROUTES['group-module']['sector'])
                        }}
                    />
                    <Button
                        className={'text-white shadow-none'}
                        size={'sm'}
                        text={"Call"}
                        onClick={() => {
                            goTo(ROUTES['group-module']['call'])
                        }}
                    />
                </div>
                <div className='mx-3'>
                    <div className='row justify-content-center '>
                        {convertedGroupDetails && convertedGroupDetails.length > 0 ?
                            convertedGroupDetails.map((el: any, index: number) => {
                                return (
                                    <div className='col-6 '>
                                        <div className={'card  py-3'}
                                            style={{ height: el.show ? dynamicHeight.dynamicHeight : '5em' }}>
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
                                                        console.log(item)
                                                        dispatch(selectedGroupIds(item))
                                                        goTo(ROUTES['group-module']['questions'])
                                                    }}

                                                />
                                            )
                                            }
                                        </div>
                                    </div>
                                )
                            })
                            : <div className={'d-flex justify-content-center align-items-center'} style={{ height: '90vh' }}><NoDataFound text={"No Data Found"} /></div>
                        }
                    </div>
                </div>
                < Modal size={'lg'} title={"Add Group"} isOpen={editModal.visible} onClose={editModal.hide} >
                    <Input

                        heading={"Name"}
                        value={title.value}
                        onChange={title.onChange}
                    />
                    <Input

                        heading={"Description"}
                        value={description.value}
                        onChange={description.onChange}
                    />
                    {sectors && sectors.length > 0 &&
                        <DropDown
                            heading={'Sectors'}
                            data={getDropDownCompanyDisplayData(sectors)}
                            selected={sector.value}
                            onChange={sector.onChange} />
                    }

                    <div className="col text-right ">
                        <Button size={'md'}
                            loading={GroupSubmitLoader.loader}
                            text={"Submit"}
                            onClick={() => createKnowledgeGroupDetails()} />
                    </div>
                </Modal >

                < Modal size={'lg'} title={"Add Variant"} isOpen={variantModal.visible} onClose={variantModal.hide} >


                    <Input
                        className={'col-6'}
                        heading={"Name"}
                        value={title.value}
                        onChange={title.onChange}
                    />
                    <Input
                        className={'col-6'}
                        heading={"Description"}
                        value={description.value}
                        onChange={description.onChange}
                    />


                    <div className="col text-right">
                        <Button size={'md'}
                            loading={VariantSubmitLoader.loader}
                            text={"Submit"}
                            onClick={() => createKnowledgeGroupVariantDetails()}
                        />
                    </div>
                </Modal >
            </div >
        </>
    )
}

export { Designation };

