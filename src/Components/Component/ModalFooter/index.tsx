import React from "react";
import { ModalFooterProps } from "./interfaces";
import { Button } from "@Components";
function ModalFooter({
  primary = 'Proceed',
  secondary = 'Cancel',
  primaryOnClick,
  secondaryOnClick,
}: ModalFooterProps) {
  return (
    <div className={"row justify-content-end px-3"}>
      <div>
        {secondary && (
          <Button
            color={"black"}
            text={secondary}
            onClick={secondaryOnClick}
          />
        )}
      </div>
      <div className="ml-3">
        {primary && <Button text={primary} onClick={primaryOnClick} />}
      </div>
    </div>
  );
}
export { ModalFooter };
export type { ModalFooterProps };
