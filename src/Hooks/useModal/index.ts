import React, { useState, useEffect } from "react";

const useModal = (initialValue: boolean) => {
  const [visible, setVisible] = useState(initialValue);

  const handleKeyPress = (event) => {
    if (event.key === "Escape") {
      hide();
    }
  };

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return {
    visible,
    show,
    hide
  };
};

export { useModal };