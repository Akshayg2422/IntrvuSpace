import React, { useEffect, useState } from 'react';
import { Spinner, Modal, Input, CommonTable, NoDataFound, Image, MenuBar, Checkbox, showToast } from '@Components';
import { SettingHeader } from '@Modules';
import { useInput, useLoader, useModal } from '@Hooks';
import { getDesignations, addDesignation } from '@Redux';
import { useDispatch, useSelector } from 'react-redux';
import { INITIAL_PAGE, paginationHandler, capitalizeFirstLetter, validate, ifObjectExist, getValidateError, ADD_DESIGNATION_CORPORATE_RULES } from '@Utils';
import { icons } from '@Assets';
import './index.css'


function SettingDesignation() {

    const dispatch = useDispatch();

    const loader = useLoader(false);

    const MENU = [{ id: '0', name: "Edit", icon: icons.edit }]


    const {
        designations,
        designationsNumOfPage,
        designationsCurrentPage
    } = useSelector(
        (state: any) => state.DashboardReducer
    );


    /**
     * add designation
     */

    const [selectedDesignation, setSelectedDesignation] = useState<any>(undefined);

    const addDesignationModal = useModal(false);
    const designationName = useInput('')
    const [isHr, setIsHr] = useState(false);
    const [isHrAdmin, setIsHrAdmin] = useState(false);
    const [isDepartmentAdmin, setIsDepartmentAdmin] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    const addLoader = useLoader(false);



    useEffect(() => {
        getDesignationApiHandler(INITIAL_PAGE)
    }, [])


    /**
     * get Designation api
     */

    const getDesignationApiHandler = (page_number: number) => {

        const params = {
            page_number,
        };
        loader.show();

        dispatch(
            getDesignations({
                params,
                onSuccess: (response: any) => () => {
                    loader.hide()
                },
                onError: (error: string) => () => {
                    loader.hide()
                },
            })
        );
    };


    /**
     * add designation api
     */

    const addDesignationApiHandler = () => {

        const params = {
            ...(selectedDesignation ? { id: selectedDesignation?.id } : {}),
            name: designationName.value,
            is_hr_admin: isHrAdmin,
            is_department_admin: isDepartmentAdmin,
            is_super_admin: isSuperAdmin,
            is_hr: isHr,
        };

        const validation = validate(ADD_DESIGNATION_CORPORATE_RULES, params)

        if (ifObjectExist(validation)) {

            addLoader.show()

            dispatch(
                addDesignation({
                    params,
                    onSuccess: (success: any) => () => {
                        addLoader.hide();
                        showToast(success.message, 'success');
                        resetValue();
                        getDesignationApiHandler(designationsCurrentPage);
                        addDesignationModal.hide();
                    },
                    onError: (error: string) => () => {
                        addLoader.hide()
                        showToast('Designation is already exists');
                    },
                })
            );
        }
        else {
            showToast(getValidateError(validation));
        }
    };


    const normalizedData = (data: any) => {

        return data.map((el: any) => {
            const { name, is_hr, is_hr_admin, is_department_admin, is_super_admin } = el

            function getActiveStatus(status: boolean) {
                if (status) {
                    return (
                        <Image
                            src={icons.check}
                            height={15}
                            width={15}
                            style={{
                                objectFit: 'contain'
                            }}
                        />
                    )
                } else {
                    return null;
                }
            }

            return {
                name: capitalizeFirstLetter(name),
                "HR Admin": getActiveStatus(is_hr_admin),
                "Department Admin": getActiveStatus(is_department_admin),
                "Super Admin": getActiveStatus(is_super_admin),
                "HR": getActiveStatus(is_hr),
                " ": <MenuBar
                    menuData={MENU}
                    onClick={(item) => {
                        const { id } = item;
                        if (id === MENU[0].id) {
                            setSelectedDesignation(el)
                            designationName.set(name)
                            setIsHrAdmin(is_hr_admin)
                            setIsDepartmentAdmin(is_department_admin)
                            setIsSuperAdmin(is_super_admin)
                            setIsHr(is_hr)
                            addDesignationModal.show()
                        }

                    }}
                />
            };
        });
    };



    function resetValue() {

        addDesignationModal.hide();

        designationName.set('')
        setIsHrAdmin(false);
        setIsHr(false);
        setIsSuperAdmin(false);
        setIsDepartmentAdmin(false);
        setSelectedDesignation(undefined);
    }



    return (
        <>
            <div className={'screen-padding'}>
                <SettingHeader
                    title={'Designation'}
                    buttonText={'Add'}
                    onClick={addDesignationModal.show}
                />

                {
                    loader.loader && <div className={'loader-container'}><Spinner /></div>
                }

                {
                    !loader.loader &&
                    designations?.length > 0 &&
                    <CommonTable
                        isPagination={designationsNumOfPage > 1}
                        displayDataSet={normalizedData(designations)}
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
                }
                {
                    !loader.loader &&
                    designations?.length <= 0 &&
                    <div className={'no-data-container'}>
                        <NoDataFound />
                    </div>
                }
            </div>

            <Modal
                loading={addLoader.loader}
                title={'Designation'}
                isOpen={addDesignationModal.visible}
                onClose={resetValue}
                onClick={addDesignationApiHandler}
            >
                <div className='row'>
                    <div className='col-sm-6'>
                        <Input
                            heading={"Name"}
                            value={designationName.value}
                            onChange={designationName.onChange}
                        />
                    </div>
                </div>
                <div className={'admin-check-container'}>
                    <Checkbox
                        id={'hr-admin'}
                        text={'HR Admin'}
                        defaultChecked={isHrAdmin}
                        onCheckChange={setIsHrAdmin}
                    />
                    <Checkbox
                        id={'department-admin'}
                        text={'Department Admin'}
                        defaultChecked={isDepartmentAdmin}
                        onCheckChange={setIsDepartmentAdmin}
                    />
                    <Checkbox
                        id={'super-admin'}
                        text={'Super Admin'}
                        defaultChecked={isSuperAdmin}
                        onCheckChange={setIsSuperAdmin}
                    />

                    <Checkbox
                        id={'ht'}
                        text={'HR'}
                        defaultChecked={isHr}
                        onCheckChange={setIsHr}
                    />
                </div>
            </Modal >
        </>
    )
}

export { SettingDesignation }