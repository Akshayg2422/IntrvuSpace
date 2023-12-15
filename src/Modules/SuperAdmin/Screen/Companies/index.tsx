import { icons } from '@Assets';
import { CommonTable, Image, Input, MenuBar, NoDataFound, Spinner, StatusIcon, showToast, Modal, ProfilePhoto } from '@Components';
import { useInput, useKeyPress, useLoader, useModal, useNavigation } from '@Hooks';
import { alterCompanyLimit, alterCompanyStatus, getCompanies, setSelectedCompany,setSelectedCompanyId } from '@Redux';
import { ROUTES } from '@Routes';
import { INITIAL_PAGE, capitalizeFirstLetter, getPhoto, paginationHandler } from '@Utils';
import { useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useDispatch, useSelector } from 'react-redux';
import { SuperAdminNavbarWrapper } from '@Modules'

function Companies() {

    const { companies, companiesNumOfPages, companiesCurrentPages } = useSelector((state: any) => state.SuperAdminReducer);
    const dispatch = useDispatch()
    const { goTo } = useNavigation();



    const proceedCreateCompany = () => {
        dispatch(setSelectedCompany(undefined))
        goTo(ROUTES['super-admin']['super-admin-register-company'])
    };



    const NAV_LIST = [
        { id: 1, text: 'Create Company', callback: proceedCreateCompany },
    ];


    /**
     * add modal
     */

    const limitModal = useModal(false);
    const addLimitLoader = useLoader(false);
    const loader = useLoader(false);
    const [selectCompanyId, setSelectCompanyId] = useState(undefined)
    const limit = useInput("")
    const search = useInput("");

    const enterPress = useKeyPress("Enter");

    useEffect(() => {
        getCompaniesApiHandler(companiesCurrentPages);
      
      
    }, [])

    useEffect(() => {
        if (enterPress) {
            
            getCompaniesApiHandler(INITIAL_PAGE);
        }
    }, [enterPress])


    function getCandidateMenu(is_active: boolean) {
        return [
            { id:'ED', name: "Edit" },
            { id: 'DE', name: is_active ? "Disable" : 'Enable' },
            { id:'AL', name: "Alter Limit" },
            { id:'RI', name: "Recent Interviews" },
        ]
    }


    const getCompaniesApiHandler = (page_number: number) => {

        const params = {
            page_number,
            ...(search?.value && { q: search?.value }),
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
            id: selectCompanyId,
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
        setSelectCompanyId(id);
        dispatch(setSelectedCompany(item))

        const MENU = getCandidateMenu(is_active)

        if ('ED' === action.id) {
            goTo(ROUTES['super-admin']['super-admin-register-company'])
        }
        else if ('DE' === action.id) {
            alterCompanyStatusApiHandler(id, is_active);
        }
        else if ('AL' === action.id) {
            limitModal.show();
            limit.set(interview_limit);
        }
        else if ('RI' === action.id) {
            goTo(ROUTES['super-admin']['recent-interviews'])
              dispatch(
                setSelectedCompanyId(id)
              )
         
        }

    }

    const normalizedTableData = (data: any) => {
        if (data && data.length > 0)
            return data.map((each: any) => {
                const {
                    display_name,
                    interview_limit,
                    consumed_interviews,
                    completed_interviews,
                    phone,
                    email,
                    address,
                    logo,
                    is_active,
                } = each;

                return {

                    "": (
                        <div className={"d-flex align-items-center"}>
                            {is_active ? <StatusIcon /> : <StatusIcon variant={'frame'} />}
                        </div>
                    ),

                    name: (
                        <div className={"d-flex align-items-center"}>
                            <ProfilePhoto photo={logo} />
                            <div className={"th-bold ml-3"}>
                                {capitalizeFirstLetter(display_name)}
                            </div>
                        </div>
                    ),
                
                    email,
                    Mobile: phone,
                    address,
                    'limit': interview_limit,
                    'Created': consumed_interviews,
                    'Completed': completed_interviews,
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
            <SuperAdminNavbarWrapper actions={NAV_LIST} />
            <div className={'screen-container'}>
                <div className="col-sm-3 m-0 p-0">
                    <Input
                        id={'search'}
                        heading={"Search"}
                        type={"text"}
                        placeHolder={"Name, Mobile, ..."}
                        value={search?.value}
                        onChange={search.onChange}
                    />
                </div>
                {
                    loader.loader &&
                    <div className={'loader-container'}>
                        <Spinner />
                    </div>
                }
                {
                    companies && companies?.length > 0 &&
                    <div className={'overflow-auto py-3'}>
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
            </div>
            {
                !loader.loader && companies?.length <= 0 &&
                <div className={"no-data-found"}>
                    <NoDataFound />
                </div>
            }
            <Modal
                loading={addLimitLoader.loader}
                title={"Alter Limit"}
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

export { Companies };
