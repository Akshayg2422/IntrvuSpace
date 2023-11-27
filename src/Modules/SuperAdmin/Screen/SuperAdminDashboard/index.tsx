import React, { useEffect, useState } from 'react'
import { SuperAdminNavbar } from '@Modules'
import { useSelector, useDispatch } from 'react-redux'
import { alterCompanyLimit, alterCompanyStatus, getCompanies } from '@Redux'
import { CommonTable, Image, Input, MenuBar, Modal, NoDataFound, Spinner, showToast } from '@Components';
import { capitalizeFirstLetter, getPhoto, paginationHandler, INITIAL_PAGE } from '@Utils';
import { icons } from '@Assets';
import { useInput, useLoader, useModal } from '@Hooks';
import { Interview } from '../Interview';

function SuperAdminDashboard() {


    const { companies, companiesNumOfPages, companiesCurrentPages } = useSelector((state: any) => state.SuperAdminReducer);


    const dispatch = useDispatch()

    /**
     * add modal
     */
    const limitModal = useModal(false);
    const addLimitLoader = useLoader(false);

    const loader = useLoader(false);


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

        loader.show();

        dispatch(
            getCompanies({
                params,
                onSuccess: () => () => {
                    loader.hide();
                },
                onError: () => () => {
                    loader.hide();
                },
            })
        );
    };

    const alterCompanyStatusApiHandler = (id: string, enable: boolean) => {
        const params = {
            id,
            is_active: !enable
        };

        dispatch(
            alterCompanyStatus({
                params,
                onSuccess: (response: any) => () => {
                    const { message } = response
                    getCompaniesApiHandler(companiesCurrentPages);
                    showToast(message, 'success')
                },
                onError: (error: any) => () => {
                    const { message } = error
                    showToast(message, 'error')
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
                    const { message } = response
                    getCompaniesApiHandler(companiesCurrentPages);
                    showToast(message, 'success')
                },
                onError: (error: any) => () => {
                    const { message } = error
                    showToast(message, 'error')
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
                            <Image
                                src={icons[is_active ? 'check' : 'frame']}
                                height={is_active ? 12 : 18}
                                width={is_active ? 12 : 18}
                                style={{
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    ),

                    name: (
                        <div className={"d-flex align-items-center"}>
                            <div>
                                <div className={'image-container'}>
                                    <Image
                                        className={logo ? '' : 'place-holder'}
                                        src={logo ? getPhoto(logo) : icons.company}
                                        style={{
                                            objectFit: "contain",
                                            filter: !logo ? "grayscale(100%)" : ""
                                        }}
                                    />
                                </div>
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
                    " ": (
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
                {
                    loader.loader &&
                    <div className={'loader-container'}>
                        <Spinner />
                    </div>
                }

                {
                    companies && companies?.length > 0 &&
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
                }
                {
                    !loader.loader && companies?.length <= 0 &&
                    <div className={"no-data-found"}>
                        <NoDataFound />
                    </div>
                }
            </div>

            <Modal
                loading={addLimitLoader.loader}
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
            <Interview/>
        </>
    )
}

export { SuperAdminDashboard }
