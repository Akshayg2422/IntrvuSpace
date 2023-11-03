import React, { useEffect } from "react";
import { ModalProps } from "./interfaces";
import { Modal as RsModal } from "reactstrap";
import { Image, Button } from '@Components'
import { icons } from "@Assets";
import './index.css'

function Modal({ loading, isOpen, children, title, subTitle, buttonText, size = 'lg', style, onClose, onClick, ...rest }: ModalProps) {

  return (

    <RsModal
      fade={false}
      className={`modal-dialog-centered modal-${size}`}
      isOpen={isOpen}
      {...rest}
    >
      <div className={'modal-container'}>
        <div className={'cancel-container'}>
          {onClose &&
            <div className={'modal-cancel-container'} onClick={onClose}>
              <Image src={icons.close} height={16} width={16} style={{
                objectFit: 'contain'
              }} />
            </div>
          }
        </div>
      </div>
      <div className={'section-modal-container'}>
        <div>
          <div className={'screen-heading'}>{title}</div>
          <div className={'sub-title-space'}>
            <small className={'text-des'}>{subTitle}</small>
          </div>
        </div>
        {
          children
        }
        <div className={'modal-bottom-container'}>
          <div className={'modal-bottom-btn'}>
            <Button loading={loading} block text={buttonText} onClick={onClick} />
          </div>
        </div>
      </div>
    </RsModal>
  );
}

export { Modal };
export type { ModalProps };

