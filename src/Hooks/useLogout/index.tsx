import { useDispatch } from "react-redux";
import { submitLogout, userLogout } from '@Redux';
import { useLoader, useNavigation } from '@Hooks';
import { ROUTES } from "@Routes";
import { showToast } from "@Components";

const useLogout = () => {
    const dispatch = useDispatch();
    const loader = useLoader(false);
    const { goTo } = useNavigation();

    const logout = () => {
        const params = {};
        loader.show();

        try {
            dispatch(
              submitLogout({
                params,
                onSuccess: () => (response: any) => {
                  loader.hide();
      
                  dispatch(
                    userLogout({
                      onSuccess: () => {
                        goTo(ROUTES["auth-module"].splash, true)
                      },
                      onError: () => {
      
                      },
                    })
                  );
                },
                onError: (error: any) => () => {
                  const { message } = error
                  showToast(message, 'error')
                  loader.show();
                },
              }))
      
          } catch (error) { }
        
    };


    return { loader, logout };
};

export { useLogout };
