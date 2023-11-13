import { icons } from '@Assets';
import {
    Button,
    Checkbox,
    CommonTable,
    Heading, Image,
    Input,
    MenuBar,
    Modal,
    NoRecordsFound,
    Spinner,
    showToast
} from "@Components";
import { useInput, useLoader, useModal, useNavigation } from "@Hooks";
import { translate } from "@I18n";
import { addDesignation, getDesignations } from '@Redux';
import { ADD_DESIGNATION_CORPORATE_RULES, getValidateError, ifObjectExist, paginationHandler, validate } from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css'

function EmployeeDesignation() {

    const {
        designations, designationsNumOfPage, designationsCurrentPage
    } = useSelector(
        (state: any) => state.DashboardReducer
    );
    // console.log('designations=======>>', JSON.stringify(designations));

    const isHr_Admin = designations
    const isDepartment_Admin = designations
    const isSuper_Admin = designations
    const isHr = designations
    const dispatch = useDispatch();
    const { goBack } = useNavigation();
    const addDesignationModal = useModal(false);
    const designationName = useInput('')
    const [editId, setEditId] = useState<any>()
    const [isHrAdmin, setIsHrAdmin] = useState(false);
    const [isDepartmentAdmin, setIsDepartmentAdmin] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [isHR, setIsHR] = useState(false);
    const [loading, setLoading] = useState(true)
    const loginLoader = useLoader(false)
    const [selectDesignation, setSelectedDesignation] = useState<any>()


    useEffect(() => {
        getDesignationApiHandler(designationsCurrentPage)
    }, [])


    const getDesignationMenu = () => [
        { id: '0', name: "Edit", icon: icons.edit },
    ]

    const addDesignationApiHandler = (params: any) => {

        const validation = validate(ADD_DESIGNATION_CORPORATE_RULES, params)

        if (ifObjectExist(validation)) {
            loginLoader.show()
            dispatch(
                addDesignation({
                    params,
                    onSuccess: (success: any) => () => {
                        addDesignationModal.hide()
                        loginLoader.hide()
                        getDesignationApiHandler(designationsCurrentPage)
                        resetValues()
                        setEditId('')
                        setSelectedDesignation('')
                        showToast(success.message, 'success')
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

    const getDesignationApiHandler = (page_number: number) => {
        setLoading(true)
        const params = {
            page_number,
        };
        loginLoader.show()
        dispatch(
            getDesignations({
                params,
                onSuccess: (response: any) => () => {
                    setLoading(false)
                    loginLoader.hide()
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

            const { name, id, is_hr, is_hr_admin, is_department_admin, is_super_admin } = el

            return {

                name: name,
                ...(isHr_Admin && {
                    'HR Admin':
                        <div className="mb--4">
                            <Checkbox id={id + "_HRadmin"}
                                defaultChecked={is_hr_admin}
                                checked={is_hr_admin}
                            />
                        </div>
                }),
                ...(isDepartment_Admin && {
                    'Department Admin':
                        <div className="mb--4">
                            <Checkbox id={id + "_DepartmentAdmin"}
                                defaultChecked={is_department_admin}
                                checked={is_department_admin}
                            />
                        </div>
                }),
                ...(isSuper_Admin && {
                    'Super Admin':
                        <div className="mb--4">
                            <Checkbox id={id + "_SuperAdmin"}
                                defaultChecked={is_super_admin}
                                checked={is_super_admin}
                            />
                        </div>
                }),
                ...(isHr && {
                    'HR':
                        <div className="mb--4">
                            <Checkbox id={id + "IsHR"}
                                defaultChecked={is_hr}
                                checked={is_hr}
                            />
                        </div>
                }),

                '':
                    ((name || isHr_Admin || isDepartment_Admin || isSuper_Admin || isHr) &&
                        <MenuBar menuData={getDesignationMenu()}
                            icon={icons.more}

                            onClick={(item) => {


                                if (item?.id === '0') {
                                    const { name, is_hr, is_hr_admin, is_department_admin, is_super_admin } = el

                                    setSelectedDesignation(el)
                                    designationName.set(name)
                                    setIsHrAdmin(is_hr_admin)
                                    setIsDepartmentAdmin(is_department_admin)
                                    setIsSuperAdmin(is_super_admin)
                                    setIsHR(is_hr)
                                    setEditId(id)
                                    addDesignationModal.show()
                                }

                            }}
                        />
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
            <div className='container'>
                <div className="row justify-content-between mt-3 pl-2 mr--2 mb-3">
                    {/* <Back /> */}
                    <div className='d-flex align-items-center'>
                        <div className=''>
                            <Image
                                onClick={() => goBack()}
                                style={{ cursor: "pointer" }}
                                src={icons.back}
                                height={15}
                            />
                        </div>
                        <div className='pl-3' >
                            <span className='headingText text-secondary'>{'Manage Designation'}</span>
                        </div>
                    </div>
                    <Button
                        className='btn btn-primary rounded-sm '
                        size={'md'}
                        text={'Add Designation'}
                        onClick={() => {
                            addDesignationModal.show()
                            getDesignationApiHandler(designationsCurrentPage)
                        }}
                    />
                </div>
                {loading && (
                    <div className={'vh-100 d-flex justify-content-center align-items-center'}>
                        <Spinner />
                    </div>)
                }


                {!loading &&
                    <div className="row px-0  mx--4">
                        <div className='col-sm-12 px-0'>
                            {designations && designations?.data?.length > 0 ? (
                                <CommonTable
                                    card
                                    isPagination={designationsNumOfPage > 1}
                                    title={'Designation'}
                                    tableDataSet={designations}
                                    displayDataSet={normalizedDesignationData(designations?.data)}
                                    noOfPage={designationsNumOfPage}
                                    currentPage={designationsCurrentPage}
                                    paginationNumberClick={(currentPage) => {

                                        getDesignationApiHandler(paginationHandler("current", currentPage));

                                    }}
                                    previousClick={() => {
                                        getDesignationApiHandler(paginationHandler("prev", designationsCurrentPage))
                                    }
                                    }
                                    nextClick={() => {
                                        getDesignationApiHandler(paginationHandler("next", designationsCurrentPage));
                                    }
                                    }


                                />
                            ) : (
                                <div
                                    className="vh-100 d-flex justify-content-center align-items-center ">
                                    <NoRecordsFound />
                                </div>
                            )}
                        </div>
                    </div>

                }

            </div>
            <Modal
                isOpen={addDesignationModal.visible}
                onClose={() => {
                    addDesignationModal.hide()
                    resetValues()
                    setEditId("")
                }}
                size='lg'
                style={{ padding: 0 }}
            >
                <div className="px-md-6 px-3 ">
                    <Heading heading={`${editId ? "Edit" : "Add"} Designation`} style={{ fontSize: '26px', fontWeight: 800, margin: 0 }} />
                    <div className='mt-4'>
                        <Input
                            placeholder={'Enter Designation'}
                            value={designationName.value}
                            onChange={designationName.onChange}
                        />
                    </div>

                    <div className="col mt-4">
                        <div className='row'>
                            <div className='px-2'>
                                {isHr_Admin &&
                                    <Checkbox id={'HrAdmin'}
                                        text={'HR Admin'}
                                        defaultChecked={isHrAdmin}
                                        onCheckChange={setIsHrAdmin}
                                    />
                                }
                            </div>
                            <div className='px-5'>
                                {isDepartment_Admin &&
                                    <Checkbox id={'Department Admin'}
                                        text={'DepartmentAdmin'}
                                        defaultChecked={isDepartmentAdmin}
                                        onCheckChange={setIsDepartmentAdmin} />
                                }
                            </div>
                            <div className='px-5'>
                                {isSuper_Admin &&
                                    <Checkbox id={'SuperAdmin'}
                                        text={'Super Admin'}
                                        defaultChecked={isSuperAdmin}
                                        onCheckChange={setIsSuperAdmin} />
                                }
                            </div>
                            <div className=' px-4'>
                                {isHr &&
                                    <Checkbox id={'isHR'}
                                        text={'HR'}
                                        defaultChecked={isHR}
                                        onCheckChange={setIsHR} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center py-5">
                    <Button
                        text={translate("common.submit")}
                        className='btn btn-primary rounded-sm px-5 '
                        style={{
                            borderColor: "#d8dade",
                            fontSize: "15px"
                        }}
                        loading={loginLoader.loader}
                        size={'lg'}
                        onClick={() => {

                            const params = {
                                ...(selectDesignation && { id: selectDesignation?.id }),
                                name: designationName.value,
                                is_hr_admin: isHrAdmin,
                                is_department_admin: isDepartmentAdmin,
                                is_super_admin: isSuperAdmin,
                                is_hr: isHR,
                                ...(isHrAdmin && { is_hr_admin: isHrAdmin }),
                                ...(isDepartmentAdmin && { is_department_admin: isDepartmentAdmin }),
                                ...(isSuperAdmin && { is_super_admin: isSuperAdmin }),
                                ...(isHR && { is_hr: isHR }),
                                ...(editId && { id: editId })
                            };
                            console.log(params, "pppppppppppp")

                            addDesignationApiHandler(params)
                        }}
                    />
                </div>
            </Modal>
        </>

    )
}

export { EmployeeDesignation };
