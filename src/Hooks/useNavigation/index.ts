import { useNavigate as useNav, useParams } from "react-router-dom";

const useNavigation = () => {
  const navigation = useNav();
  const params = useParams();

  const goTo = (to: string, replace: boolean = false) =>
    navigation(to, { replace: replace });


  const goBack= (action:number= -1) => navigation(action)
  return { goTo , goBack, params};

};

export { useNavigation };
