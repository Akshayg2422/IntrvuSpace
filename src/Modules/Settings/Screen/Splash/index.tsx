import React, { useEffect } from "react";
import { Logo, Image, Button } from "@Components";
import { ROUTES } from "@Routes";
import { useNavigation } from "@Hooks";
import { useSelector, useDispatch } from 'react-redux'
import { icons } from "@Assets";
import { Landing } from '@Modules'


function Splash() {

    const SPLASH_STAY_TIME_MILE_SECONDS = 1500;
    const { goTo } = useNavigation();
    const dispatch = useDispatch()


    const { loginDetails } = useSelector((state: any) => state.AppReducer);


    useEffect(() => {
        setTimeout(() => {
            if (loginDetails?.isLoggedIn) {
                if (loginDetails.is_admin) {
                    const route = localStorage.getItem('route');
                    if (route) {
                        localStorage.removeItem('route');
                        goTo(route, true);
                    } else {
                        goTo(ROUTES['designation-module'].schedule, true);
                    }
                }
                else {
                    const route = localStorage.getItem('route');
                    if (route) {
                        localStorage.removeItem('route');
                        goTo(route, true);
                    } else {
                        goTo(ROUTES['designation-module'].client, true)
                    }
                }


            }

        }, SPLASH_STAY_TIME_MILE_SECONDS);
    }, []);

    return (
        <div>
            {loginDetails?.isLoggedIn ? <div className={"d-flex vh-100  justify-content-center align-items-center bg-white"}>
                <div className="text-center">
                    <Image
                        src={icons.logoText}
                        height={"30%"}
                        width={"30%"}
                    />
                </div>

            </div>
                : <Landing />
            }
        </div>
    );
}

export { Splash };
