import { icons } from "@Assets";
import { Image, showToast } from "@Components";
import { useNavigation } from "@Hooks";
import { Website } from '@Modules';
import { ROUTES } from "@Routes";
import { TYPE_CORPORATE, TYPE_SUPER_ADMIN, TYPE_JOB_SEEKER } from "@Utils";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getDashboard, userLogout } from '@Redux'


function Splash() {

    const dispatch = useDispatch()

    const SPLASH_STAY_TIME_MILE_SECONDS = 1500;
    const { goTo } = useNavigation();


    const { loginDetails } = useSelector((state: any) => state.AppReducer);
    const { isLoggedIn, user_type } = loginDetails || {}

    function getDashboardApiHandler() {
        const params = {}
        dispatch(
            getDashboard({
                params,
                onSuccess: (response: any) => () => {

                    const { basic_info: { company_active_status } } = response?.details
                    console.log(JSON.stringify(response));

                    if (company_active_status) {
                        userRoutingHandler();
                    } else {
                        dispatch(
                            userLogout({
                                onSuccess: () => () => {
                                    goTo(ROUTES['auth-module'].login, true)
                                    showToast('Your company status is inactive. Please contact the administrator.')
                                },
                                onError: () => () => {
                                },
                            }))
                    }
                },
                onError: (error: any) => () => {
                    showToast(error.error_message, 'error');
                },
            })
        );
    }


    function userRoutingHandler() {
        const route = localStorage.getItem('route');

        let reDirectRoute: any = undefined

        if (user_type === TYPE_CORPORATE) {
            reDirectRoute = ROUTES['designation-module'].schedule
        } else if (user_type === TYPE_JOB_SEEKER) {
            reDirectRoute = ROUTES['designation-module'].client
        } else if (user_type === TYPE_SUPER_ADMIN) {
            reDirectRoute = ROUTES["super-admin"].companies
        }

        if (reDirectRoute) {
            if (route) {
                localStorage.removeItem('route');
                goTo(route, true);
            } else {
                goTo(reDirectRoute, true);
            }
        } else {
            goTo(ROUTES['auth-module'].login, true)
        }
    }


    useEffect(() => {
        setTimeout(() => {
            if (isLoggedIn) {
                getDashboardApiHandler();
            }

        }, SPLASH_STAY_TIME_MILE_SECONDS);
    }, []);

    return (
        <div>
            {isLoggedIn ?
                <div className={"d-flex vh-100  justify-content-center align-items-center bg-white"}>
                    <div className="text-center">
                        <Image
                            src={icons.logoText}
                            height={"30%"}
                            width={"30%"}
                        />
                    </div>

                </div>
                :
                <Website />
            }
        </div>
    );
}

export { Splash };
