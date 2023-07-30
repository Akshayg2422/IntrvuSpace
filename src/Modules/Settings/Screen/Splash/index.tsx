import React, { useEffect } from "react";
import { Logo } from "@Components";
import { ROUTES } from "@Routes";
import { useNavigation } from "@Hooks";
import { useSelector, useDispatch } from 'react-redux'


function Splash() {

    const SPLASH_STAY_TIME_MILE_SECONDS = 1500;
    const { goTo } = useNavigation();
    const dispatch = useDispatch()

    const { loginUser } = useSelector((state: any) => state.AuthReducer);


    useEffect(() => {
        setTimeout(() => {
            if (loginUser?.details?.token) {
                if (loginUser?.details?.is_admin) {
                    goTo(ROUTES['designation-module'].designation, true)
                }
                else {
                    goTo(ROUTES['designation-module'].client, true)
                }


            }
            else {
                goTo(ROUTES["auth-module"].login, true);
            }
        }, SPLASH_STAY_TIME_MILE_SECONDS);
    }, []);

    return (
        <div className={"d-flex vh-100 bg-primary justify-content-center align-items-center"}>
            <div className='pb-0 mb--1 font-weight-bolder display-1 text-white'
                style={{
                    fontSize: '13vh'
                }}
            >MOCK <b className='text-black'>EAZY</b></div>
        </div>
    );
}

export { Splash };
