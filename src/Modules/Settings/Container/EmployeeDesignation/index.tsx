import { addDesignation, getDesignations } from '@Redux';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertToUpperCase, paginationHandler, ADD_DESIGNATION, ifObjectExist, validate, getValidateError, INITIAL_PAGE, } from "@Utils";
import { useDynamicHeight, useModal, useInput, useLoader, useDropDown } from "@Hooks";
import {
    Button,
    Card,
    CommonTable,
    Input,
    Modal,
    NoRecordsFound,
    showToast,
    Checkbox,
    Spinner,
    MenuBar,
} from "@Components";
import { translate } from "@I18n";
import { icons } from '@Assets';

function EmployeeDesignation() {

    const {
        designations,
    } = useSelector(
        (state: any) => state.DashboardReducer
    );
    // console.log('designations=======>>', JSON.stringify(designations));

    const isHr_Admin = designations
    const isDepartment_Admin = designations
    const isSuper_Admin = designations
    const isHr = designations
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const department = useDropDown({})
    const dynamicHeight: any = useDynamicHeight()
    const [showDesignations, setShowDesignations] = useState(true);
    const addDesignationModal = useModal(false);
    const designationName = useInput('')
    const [isHrAdmin, setIsHrAdmin] = useState(false);
    const [isDepartmentAdmin, setIsDepartmentAdmin] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [isHR, setIsHR] = useState(false);
    const loginLoader = useLoader(false)
    const [selectDesignation, setSelectedDesignation] = useState<any>()

// console.log('EmployeeDesignation>>>>>>>>',JSON.stringify(designations));


    useEffect(() => {
        getDesignationApiHandler()
    }, [])

    // useEffect(() => {
    //     console.log('Designations:========>>>//', designations);
    // }, [designations])

    const getDesignationMenu = () => [
        { id: '0', name: "Edit", icon: icons.edit },
    ]

    const addDesignationApiHandler = (params: any) => {

        const validation = validate(ADD_DESIGNATION, params)

        if (ifObjectExist(validation)) {
            loginLoader.show()
            dispatch(
                addDesignation({
                    params,
                    onSuccess: (success: any) => () => {
                        addDesignationModal.hide()
                        loginLoader.hide()
                        getDesignationApiHandler()
                        resetValues()
                        department.set({})
                        setSelectedDesignation('')
                    },
                    onError: (error: string) => () => {
                        loginLoader.hide()
                        showToast('Designation is already exists');
                    },
                })
            );
        }
        else {
            showToast(getValidateError(validation));
        }
    };

    const getDesignationApiHandler = () => {
        setLoading(true)
        const params = {};
        loginLoader.show()
        dispatch(
            getDesignations({
                params,
                onSuccess: (response: any) => () => {
                    setLoading(false)
                    loginLoader.hide()
                    // console.log('getDesignations=====----', response);

                },
                onError: (error: string) => () => {
                    setLoading(false)
                    loginLoader.hide()
                },
            })
        );
    };



    const normalizedDesignationData = (data: any) => {

        return data.map((el: any) => {
     
            // console.log('qqqqqqqqqqqqqq...',el);
            
            const { name, id, is_hr, is_hr_admin, is_department_admin, is_super_admin } = el

            return {
                name: name,
                ...(isHr_Admin && {
                    'HR Admin': 
                        <div className="mb--4">
                            <Checkbox id={id + "_HRadmin"} defaultChecked={is_hr_admin} checked={is_hr_admin} onCheckChange={(checked) => {
                                const params = {
                                    is_hr_admin: checked,
                                    id: id,
                                    name
                                };
                                addDesignationApiHandler(params)

                            }} />
                        </div>
                }),
                ...(isDepartment_Admin && {
                    'Department Admin':
                        <div className="mb--4">
                            <Checkbox id={id + "_DepartmentAdmin"} defaultChecked={is_department_admin} checked={is_department_admin} onCheckChange={(checked) => {
                                const params = {
                                    is_department_admin: checked,
                                    id: id,
                                    name
                                };
                                addDesignationApiHandler(params)

                            }} />
                        </div>
                }),
                ...(isSuper_Admin && {
                    'Super Admin':
                        <div className="mb--4">
                            <Checkbox id={id + "_SuperAdmin"} defaultChecked={is_super_admin} checked={is_super_admin} onCheckChange={(checked) => {
                                const params = {
                                    is_super_admin: checked,
                                    id: id,
                                    name
                                };
                                addDesignationApiHandler(params)

                            }} />
                        </div>
                }),
                ...(isHr && {
                    'HR':
                        <div className="mb--4">
                            <Checkbox id={id + "IsHR"} defaultChecked={is_hr} checked={is_hr} onCheckChange={(checked) => {
                                const params = {
                                    is_hr: checked,
                                    id: id,
                                    name
                                };
                                addDesignationApiHandler(params)

                            }} />
                        </div>
                }),

                '':
                    ((name || isHr_Admin || isDepartment_Admin || isSuper_Admin || isHr) &&
                        <MenuBar menuData={getDesignationMenu()} onClick={(item) => {


                            if (item?.id === '0') {
                                const { name, is_hr, is_hr_admin, is_department_admin, is_super_admin} = el

                                setSelectedDesignation(el)
                                designationName.set(name)
                                setIsHrAdmin(is_hr_admin)
                                setIsDepartmentAdmin(is_department_admin)
                                setIsSuperAdmin(is_super_admin)
                                setIsHR(is_hr)
                                addDesignationModal.show()


                            }
                            else if (item?.id === '1') {
                                const { name, id, is_hr, is_hr_admin, is_department_admin, is_super_admin } = el
                                // setIsSubTask(true)
                                setSelectedDesignation(el)
                                designationName.set(name)
                                setIsHrAdmin(is_hr_admin)
                                resetValues()
                                setIsDepartmentAdmin(is_department_admin)
                                setIsSuperAdmin(is_super_admin)
                                setIsHR(is_hr)
                            }

                        }} />
                    )

            };
        });
    };


    function resetValues() {
        designationName.set('')
        setIsHrAdmin(false)
        setIsDepartmentAdmin(false)
        setIsSuperAdmin(false)
        setIsHR(false)

    }


    return (
        <>
            <Card className={'mb-3'} style={{
                height: showDesignations ? dynamicHeight.dynamicHeight - 35 : '5em',
            }}>
                <div className="row">
                    <div className="col">
                        <h3>{translate("auth.designation")}</h3>
                    </div>



                    <div className="text-right mr-3 ">


                        {/* <Button
                            className={'text-white'}
                            text={
                                showDesignations 
                            }
                            size={"sm"}
                            onClick={() => {
                                setShowDesignations(!showDesignations)
                                if (!showDesignations) {
                                    getDesignationApiHandler();
                                }
                            }}
                        /> */}

                        <Button
                            className={'text-white'}
                            text={'Add Department'}
                            size={"sm"}
                            onClick={() => {
                                addDesignationModal.show()
                                getDesignationApiHandler()
                            }}
                        />
                    </div>
                </div>


                <div
                    className="overflow-auto overflow-hide"
                    style={{
                        height: showDesignations ? dynamicHeight.dynamicHeight - 100 : '0px',
                        marginLeft: "-23px",
                        marginRight: "-23px"
                    }}>
                    {
                        loading && (
                            <div className='d-flex justify-content-center align-item-center' style={{ marginTop: '200px' }}>
                                <Spinner />
                            </div>
                        )
                    }
                    {designations && designations?.length > 0 ? (
                        <CommonTable
                            isPagination
                            tableDataSet={designations}
                            displayDataSet={normalizedDesignationData(designations)}

                        />
                    ) : (
                        <div
                            className="h-100 d-flex justify-content-center align-items-center">
                            <NoRecordsFound />
                        </div>
                    )}
                </div>
            </Card>

            {
                /**
                 * add Designation Modal
                 */
            }

            <Modal
                isOpen={addDesignationModal.visible}
                onClose={() => {
                    addDesignationModal.hide()
                    resetValues()
                }}
                title={translate("auth.designation")!}
                size='lg'
            >
                <Input
                    placeholder={'Enter Designation'}
                    value={designationName.value}
                    onChange={designationName.onChange}
                />

                <div className="col">
                    <div className='row'>
                        {isHr_Admin && <Checkbox id={'HrAdmin'} text={'HR Admin'} defaultChecked={isHrAdmin} onCheckChange={setIsHrAdmin} />}
                        <div className='ml-5'>
                            {isDepartment_Admin && <Checkbox id={'Department Admin'} text={'DepartmentAdmin'} defaultChecked={isDepartmentAdmin} onCheckChange={setIsDepartmentAdmin} />}
                        </div>
                        <div className='ml-5'>
                            {isSuper_Admin && <Checkbox id={'SuperAdmin'} text={'Super Admin'} defaultChecked={isSuperAdmin} onCheckChange={setIsSuperAdmin} />}
                        </div>
                        <div className='ml-5'>
                            {isHr && <Checkbox id={'isHR'} text={'HR'} defaultChecked={isHR} onCheckChange={setIsHR} />}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    {/* <Button
                        color={"secondary"}
                        text={translate("common.cancel")}
                        onClick={() => {
                            addDesignationModal.hide()
                            resetValues()
                        }}
                    /> */}
                    <Button
                        text={translate("common.submit")}
                        loading={loginLoader.loader}
                        onClick={() => {

                            const params = {
                                ...(selectDesignation && { id: selectDesignation?.id }),
                                name: designationName.value,
                                // isHrAdmin: isHrAdmin,
                                ...(isHrAdmin && { is_hr_admin: isHrAdmin }),
                                ...(isDepartmentAdmin && { is_super_admin: isDepartmentAdmin }),
                                ...(isSuperAdmin && { is_super_admin: isSuperAdmin }),
                                ...(isHR && { is_hr: isHR })
                            };

                            addDesignationApiHandler(params)
                        }}
                    />
                </div>
            </Modal>
        </>

    )
}

export { EmployeeDesignation }