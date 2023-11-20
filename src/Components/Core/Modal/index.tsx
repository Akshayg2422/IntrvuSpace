import React, { useEffect } from "react";
import { ModalProps } from "./interfaces";
import { Modal as RsModal } from "reactstrap";
import { Image, Button } from '@Components'
import { icons } from "@Assets";
import './index.css'

function Modal({ loading, isOpen, children, title, subTitle, buttonText = 'Submit', size = 'lg', style, onClose, onClick, ...rest }: ModalProps) {

  useEffect(() => {
    // Add and remove the "overflow-hidden" class to the body based on modal's open state
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup the class when the component unmounts
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <RsModal
      fade={false}
      className={`modal-dialog-centered modal-${size}`}
      isOpen={isOpen}
      {...rest}
    >
      <div className={'modal-container'}>
        {onClose &&
          <div className={'cancel-container'}>
            <div className={'modal-cancel-container'} onClick={onClose}>
              <Image src={icons.close} height={15} width={15} style={{
                objectFit: 'contain'
              }} />
            </div>
          </div>
        }
      </div>
      <div className={'section-modal-container'}>
        <div>
          <div className={'screen-heading'}>{title}</div>
          <div className={'sub-title-space'}>
            <small className={'text-des'}>{subTitle}</small>
          </div>
        </div>
        <div className={'modal-child-container'}>
          {children}
        </div>
        {onClick &&
          <div className={'modal-bottom-container'}>
            <div className={'modal-bottom-btn'}>
              <Button loading={loading} block text={buttonText} onClick={onClick} />
            </div>
          </div>
        }
      </div>
    </RsModal>
  );
}

export { Modal };
export type { ModalProps };
