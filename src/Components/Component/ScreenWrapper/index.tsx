import React, { useEffect } from "react";
import { ScreenWrapperProps } from "./interfaces";
import { useWindowDimensions } from '@Hooks'

function ScreenWrapper({ children }: ScreenWrapperProps) {
  return <div>{children}</div>;
}

export { ScreenWrapper };
