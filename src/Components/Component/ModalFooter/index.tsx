import React from "react";
import { ModalFooterProps } from "./interfaces";
import { Button } from "@Components";
import './index.css'

function ModalFooter({
  loading,
  primary = 'Proceed',
  secondary = 'Cancel',
  primaryOnClick,
  secondaryOnClick,
}: ModalFooterProps) {
  return (
    <div className={'modal-alert-wrapper'}>
      <div className={'btn-wrapper'}>
        {secondary && (
          <Button
            block
            color={'white'}
            text={secondary}
            onClick={secondaryOnClick}
          />
        )}
      </div>

      <div className={'btn-wrapper btn-spacing'}>
        {primary && <Button block loading={loading} text={primary} onClick={primaryOnClick} />}
      </div>
    </div>
  );
}
export { ModalFooter };
export type { ModalFooterProps };
