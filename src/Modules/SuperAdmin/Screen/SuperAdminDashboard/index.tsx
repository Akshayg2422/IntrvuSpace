import React, { useEffect } from 'react'
import { SuperAdminNavbar } from '@Modules'
import { useSelector, useDispatch } from 'react-redux'
import { alterCompanyStatus, getCompanies } from '@Redux'
import { log } from 'console';

function SuperAdminDashboard() {

    const { companies } = useSelector((state: any) => state.SuperAdminReducer);
    const dispatch = useDispatch()

    useEffect(() => {
        getCompaniesApiHandler();
        alterCompanyStatusApiHandler()
    }, [])

    const alterCompanyStatusApiHandler=()=>{
        const params = {

        };
        dispatch(
            alterCompanyStatus({
                params,
                onSuccess: () => () => {

                },
                onError: () => () => {
                },
            })
        );

    }


    const getCompaniesApiHandler = () => {
        const params = {

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




    console.log(companies);

    return (
        <div className={'screen'}>
            <SuperAdminNavbar />
            {
                companies && companies.length > 0 && companies.map(each => {
                    const { display_name } = each
                    return (
                        <h1>{display_name}</h1>
                    )
                })
            }
        </div>
    )
}

export { SuperAdminDashboard }
