import { ScreenWrapperProps } from "./interfaces";
import { useOnlineStatus } from '@Hooks'
import { useSelector } from 'react-redux'
import { InternetError } from '@Components'

function ScreenWrapper({ children }: ScreenWrapperProps) {

  const { loginDetails } = useSelector((state: any) => state.AppReducer);

  const { isLoggedIn } = loginDetails || {}

  const isOnline = useOnlineStatus();

  if (!isOnline && (window.location.pathname !== '/' || isLoggedIn)) {
    return (

      <InternetError />

    );
  }
  return <div>{children}</div>;

}

export { ScreenWrapper };
