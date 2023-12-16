import { ROUTES } from "@Routes";
import { useLocation, useNavigate as useNav, useParams } from "react-router-dom";

const useNavigation = () => {
  const navigation = useNav();
  const params = useParams();
  const location = useLocation();

  const goTo = (to: string, replace: boolean = false) =>{
    navigation(to, { replace: replace });
    console.log(replace,to,"replace======")

  }

  const goBack = (action: number = -1) => {
    const doesAnyHistoryEntryExist = location.key !== "default";

    if (doesAnyHistoryEntryExist) {
      navigation(action)
    } else {
      navigation(ROUTES["auth-module"].splash)
    }

  }

  return { goTo, goBack, params };

};

export { useNavigation };
