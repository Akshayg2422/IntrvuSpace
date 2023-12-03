import React, { useEffect, useState } from 'react'
import { SuperAdminNavbar } from '@Modules'
import { useSelector, useDispatch } from 'react-redux'
import { alterCompanyLimit, alterCompanyStatus, getCompanies, setSelectedCompany } from '@Redux'
import { CommonTable, Image, Input, MenuBar, Modal, NoDataFound, Spinner, StatusIcon, showToast, Sidebar } from '@Components';
import { capitalizeFirstLetter, getPhoto, paginationHandler, INITIAL_PAGE } from '@Utils';
import { icons } from '@Assets';
import { useInput, useKeyPress, useLoader, useModal, useNavigation } from '@Hooks';
import { ROUTES } from '@Routes'
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

function SuperAdminDashboard() {

    const [sidenavOpen, setSidenavOpen] = React.useState(true);

    const { companies, companiesNumOfPages, companiesCurrentPages } = useSelector((state: any) => state.SuperAdminReducer);
    const dispatch = useDispatch()
    const { goTo } = useNavigation();

    /**
     * add modal
     */

    const limitModal = useModal(false);
    const addLimitLoader = useLoader(false);
    const loader = useLoader(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState(undefined)
    const limit = useInput("")
    const search = useInput("");

    const enterPress = useKeyPress("Enter");

    useEffect(() => {
        getCompaniesApiHandler(INITIAL_PAGE);
    }, [])

    useEffect(() => {
        if (enterPress) {
            getCompaniesApiHandler(INITIAL_PAGE);
        }
    }, [enterPress])


    function getCandidateMenu(is_active: boolean) {
        return [
            { id: 0, name: "Edit" },
            { id: 1, name: is_active ? "Disable" : 'Enable' },
            { id: 2, name: "Alter Limit" },
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
            id: selectedCompanyId,
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

        setSelectedCompanyId(id);
        dispatch(setSelectedCompany(item))

        const MENU = getCandidateMenu(is_active)

        if (MENU[0].id === action.id) {
            goTo(ROUTES['super-admin']['super-admin-register-company'])
        }
        else if (MENU[1].id === action.id) {
            alterCompanyStatusApiHandler(id, is_active);
        }
        else if (MENU[2].id === action.id) {
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
                            <div>
                                <div className={'image-container'}>
                                    {logo ?
                                        <PhotoProvider>
                                            <div className={"pointer"}>
                                                <PhotoView src={getPhoto(logo)}>
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
                                                </PhotoView>
                                            </div>
                                        </PhotoProvider>
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

    const toggleSidenav = () => {
        if (document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.remove("g-sidenav-pinned");
            document.body.classList.add("g-sidenav-hidden");
        } else {
            document.body.classList.add("g-sidenav-pinned");
            document.body.classList.remove("g-sidenav-hidden");
        }
        setSidenavOpen(!sidenavOpen);
    };


    const routes = [
        {
            path: "/charts",
            name: "Charts",
            icon: "ni ni-chart-pie-35 text-info",
            component: <></>,
            layout: "/admin",
        },
    ];

    const mainContentRef = React.useRef(null);

    return (
        <React.Fragment>
            <Sidebar
                routes={routes}
                toggleSidenav={toggleSidenav}
                sidenavOpen={sidenavOpen}
                logo={{
                    innerLink: "/",
                    imgSrc: require('/'),
                    imgAlt: "...",
                }}
            />
            <div className="main-content" ref={mainContentRef}>
                <div className={'screen'}>
                    <SuperAdminNavbar sidenavOpen={sidenavOpen} toggleSidenav={toggleSidenav} />
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
                </div>
            </div>


            {sidenavOpen ? (
                <div className="backdrop d-xl-none" onClick={toggleSidenav} />
            ) : null}

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
        </React.Fragment>
    )
}

export { SuperAdminDashboard }
