import React, { useEffect, useState } from 'react'
import { SuperAdminNavbar } from '@Modules'
import { useSelector, useDispatch } from 'react-redux'
import { alterCompanyLimit, alterCompanyStatus, getCompanies } from '@Redux'
import { CommonTable, Image, Input, MenuBar, Modal, NoDataFound, Spinner, showToast } from '@Components';
import { capitalizeFirstLetter, getPhoto, paginationHandler, INITIAL_PAGE } from '@Utils';
import { icons } from '@Assets';
import { useInput, useLoader, useModal } from '@Hooks';

function SuperAdminDashboard() {


    const { companies, companiesNumOfPages, companiesCurrentPages } = useSelector((state: any) => state.SuperAdminReducer);
    const dispatch = useDispatch()
    const limitModal = useModal(false);
    const limitLoader = useLoader(false);
    const [selectedCompany, setSelectedCompany] = useState(undefined)
    const limit = useInput("")

    useEffect(() => {
        getCompaniesApiHandler(INITIAL_PAGE);
    }, [])


    function getCandidateMenu(is_active: boolean) {
        return [
            { id: 1, name: is_active ? "Disable" : 'Enable' },
            { id: 2, name: "Limit" },
        ]
    }
    const getCompaniesApiHandler = (page_number: number) => {
        const params = {
            page_number
        };
        dispatch(
            getCompanies({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {
                },
            })
        );
    };

    const alterCompanyStatusApiHandler = (id: string, enable: boolean) => {
        const params = {
            id,
            is_active: !enable
        };
        console.log('API Params:', params);
        dispatch(
            alterCompanyStatus({
                params,
                onSuccess: (response: any) => () => {
                    getCompaniesApiHandler(companiesCurrentPages);
                    showToast(response?.message, 'success')
                },
                onError: (error) => () => {
                    showToast(error?.message, 'error')
                },
            })
        );
    }

    const alterCompanyLimitApiHandler = () => {
        const params = {
            id: selectedCompany,
            new_limit: limit.value
        };
        dispatch(
            alterCompanyLimit({
                params,
                onSuccess: (response: any) => () => {
                    limitModal.hide()
                    getCompaniesApiHandler(companiesCurrentPages);
                    showToast(response?.message, 'success')
                },
                onError: (error: any) => () => {
                    showToast(error?.message, 'error')
                },
            })
        );
    };

    function companyMenuHandler(action: any, item: any) {
        const { id, is_active, interview_limit } = item;

        setSelectedCompany(id);
        const MENU = getCandidateMenu(is_active)


        if (MENU[0].id === action.id) {
            alterCompanyStatusApiHandler(id, is_active);
        }
        else if (MENU[1].id === action.id) {
            limitModal.show();
            limit.set(interview_limit);
        }
    }

    const normalizedTableData = (data: any) => {
        if (data && data.length > 0)
            return data.map((each: any) => {
                const {
                    display_name,
                    interview_limit,
                    consumed_interviews,
                    phone,
                    email,
                    address,
                    logo,
                    is_active,
                } = each;

                return {

                    "": (
                        <div className={"d-flex align-items-center"}>
                            {is_active ? (
                                <Image
                                    src={icons?.check}
                                    height={12}
                                    width={12}
                                    style={{
                                        objectFit: "contain",
                                    }}
                                />
                            ) : <Image
                                src={icons?.frame}
                                height={18}
                                width={18}
                                style={{
                                    objectFit: "contain",
                                }}
                            />}
                        </div>
                    ),

                    name: (
                        <div className={"d-flex align-items-center"}>
                            <div>
                                {logo ?
                                    <Image
                                        src={getPhoto(logo)}
                                        height={50}
                                        width={50}
                                        style={{
                                            objectFit: 'cover',
                                            overflow: 'hidden',
                                            padding: '1px',
                                            borderRadius: '30px',
                                            width: "45px",
                                            height: "45px",
                                        }}
                                    />
                                    :
                                    <div style={{
                                        width: "45px",
                                        height: "45px",
                                        borderRadius: "30px",
                                        backgroundColor: "#FAFBFF",
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',

                                    }}>
                                        <Image
                                            src={icons.profile}
                                            height={20}
                                            width={20}
                                            style={{
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </div>
                                }
                            </div>
                            <div className={"th-bold ml-3"}>
                                {capitalizeFirstLetter(display_name)}
                            </div>
                        </div>
                    ),
                    Mobile: phone,
                    email,
                    address,
                    'limit': interview_limit,
                    'consumed': consumed_interviews,
                    "  ": (
                        <div className={"d-flex align-items-center"}>
                            {
                                <div className={"th-menu-container"}>
                                    <MenuBar
                                        menuData={getCandidateMenu(is_active)}
                                        onClick={(action) => companyMenuHandler(action, each)}
                                    />
                                </div>
                            }
                        </div>
                    )
                };
            });
    };

    return (
        <>
            <div className={'screen'}>
                <SuperAdminNavbar />
                {companies ? (
                    companies.length > 0 ? (
                        <div className={'screen-container overflow-auto'}>
                            <CommonTable
                                isPagination
                                tableDataSet={companies}
                                displayDataSet={normalizedTableData(companies)}
                                noOfPage={companiesNumOfPages}
                                currentPage={companiesCurrentPages}
                                paginationNumberClick={(currentPage) => {
                                    getCompaniesApiHandler(
                                        paginationHandler("current", currentPage)
                                    );
                                }}
                                previousClick={() => {
                                    getCompaniesApiHandler(
                                        paginationHandler("prev", companiesCurrentPages)
                                    );
                                }}
                                nextClick={() => {
                                    getCompaniesApiHandler(
                                        paginationHandler("next", companiesCurrentPages)
                                    );
                                }}
                            />
                        </div>
                    ) : (
                        <div className={"no-data-found"}>
                            <NoDataFound />
                        </div>
                    )
                ) : (
                    <div className={"h-100vh d-flex justify-content-center align-items-center"}>
                        <Spinner />
                    </div>
                )}
            </div>

            <Modal
                loading={limitLoader.loader}
                title={"Edit Limit"}
                isOpen={limitModal.visible}
                onClose={limitModal.hide}
                onClick={alterCompanyLimitApiHandler}
            >
                <div className={"row"}>
                    <div className={"col-sm-6"}>
                        <Input
                            heading={"Limit"}
                            value={limit.value}
                            onChange={limit.onChange}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export { SuperAdminDashboard }
