import { useState } from "react";

const useLoader = (initialValue: boolean) => {

  const [loader, setLoader] = useState(initialValue);

  const hide = () => {
    setLoader(false);
  };

  const show = () => {
    setLoader(true);
  };

  return {
    loader,
    show,
    hide,
  };
};

export { useLoader };
