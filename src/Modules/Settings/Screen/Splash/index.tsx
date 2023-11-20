import { icons } from "@Assets";
import { Image } from "@Components";
import { useNavigation } from "@Hooks";
import { Website } from '@Modules';
import { ROUTES } from "@Routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';


function Splash() {

    const SPLASH_STAY_TIME_MILE_SECONDS = 1500;
    const { goTo } = useNavigation();


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
                // : <Landing />
                : <Website />
            }
        </div>
    );
}

export { Splash };
