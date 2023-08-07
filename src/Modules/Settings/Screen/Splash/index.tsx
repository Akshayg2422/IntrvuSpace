import React, { useEffect } from "react";
import { Logo, Image, Button } from "@Components";
import { ROUTES } from "@Routes";
import { useNavigation } from "@Hooks";
import { useSelector, useDispatch } from 'react-redux'
import { icons } from "@Assets";


function Splash() {

    const SPLASH_STAY_TIME_MILE_SECONDS = 1500;
    const { goTo } = useNavigation();
    const dispatch = useDispatch()


    const { loginUser, } = useSelector((state: any) => state.AuthReducer);


    useEffect(() => {
        setTimeout(() => {
            if (loginUser?.details?.token) {


                if (loginUser?.details?.is_admin) {
                    const route = localStorage.getItem('route');
                    if (route) {
                        localStorage.removeItem('route');
                        goTo(route, true);
                    } else {
                        goTo(ROUTES['designation-module'].designation, true);
                    }
                }
                else {
                    goTo(ROUTES['designation-module'].client, true)
                }


            }
            // else {
            //     goTo(ROUTES["auth-module"].splash, true);
            // }
        }, SPLASH_STAY_TIME_MILE_SECONDS);
    }, []);

    return (
        <div>
            {loginUser?.details?.token ? <div className={"d-flex vh-100  justify-content-center align-items-center"}>
                <div className="text-center">
                    <Image
                        src={icons.logo}
                        height={'13%'}
                        width={'13%'}
                    />
                    <div className='pb-0 mb--1 font-weight-bolder  display-3 text-primary'
                        style={{
                            fontSize: '13vh'
                        }}
                    >MOCK <b className='text-black'>EAZY</b>
                    </div>
                </div>

            </div>
                : <div>

                    <Button text={'Login'} onClick={() => {
                        goTo(ROUTES["auth-module"].login, true);
                    }} />
                </div>
            }
        </div>
    );
}

export { Splash };
