import React, { useEffect } from "react";
import { CandidateModalProps } from "./interfaces";
import { Modal as RsModal } from "reactstrap";
import { Image, Button, MenuBar } from '@Components'
import { icons } from "@Assets";
import './index.css'

function CandidateModal({ loading, isOpen, children, title, subTitle, outlineButtonText = 'Reset', buttonText = 'Submit', size = 'lg', style, menubar, imagePicker, onClose, onClick, onClickOutline, ...rest }: CandidateModalProps) {

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
          <div className={'row close-candidate-container'}>
            <div className={'pr-3'}>
              {menubar}
            </div>
            <div className={'pointer'} onClick={onClose}>
              <Image src={icons.close} height={15} width={15} style={{
                objectFit: 'contain'
              }} />
            </div>
          </div>
        }
      </div>
      <div className={'section-candidate-modal-container'}>
        <div>
          <div className={'row title-container'}>
            <div className={'screen-heading title-space'}>{title}</div>
            {onClickOutline &&
              <div className="button-space">
                <Button outline loading={loading} block text={outlineButtonText} onClick={onClickOutline} />
              </div>
            }
          </div>
          <div className={'sub-title-space'}>
            <small className={'text-des'}>{subTitle}</small>
          </div>
        </div>
        <div>
          {imagePicker}
        </div>
        <div>
          {children}
        </div>
        {onClick &&
          <div className={'candidate-modal-bottom-container'}>
            <div className={'candidate-modal-bottom-btn'}>
              <Button loading={loading} block text={buttonText} onClick={onClick} />
            </div>
          </div>
        }
      </div>
    </RsModal>
  );
}

export { CandidateModal };
export type { CandidateModalProps };
