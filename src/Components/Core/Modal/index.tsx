import React, { useEffect } from "react";
import { ModalProps } from "./interfaces";
import { Modal as RsModal } from "reactstrap";
import { Image } from '@Components'
import { icons } from "@Assets";

function Modal({ isOpen, children, title, size = "lg", style, onClose, ...rest }: ModalProps) {

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
      <div className="modal-content" style={{ border: "1px solid #D5DFFF", borderRadius: "4px", overflow: 'hidden' }} >
        <div className={"modal-header mb-0"} style={{
          overflow: 'hidden'
        }} >
          {title && <div className='display-3 text-secondary font-weight-700'>
            {title}
          </div>}
          {onClose &&
            <button
              aria-label={"Close"}
              className={"close"}
              data-dismiss={"modal"}
              type={"button"}
              onClick={() => {
                if (onClose) {
                  onClose();
                }
              }}
            >
              <Image src={icons.close} height={20} width={20} />
            </button>
          }
        </div>
        <div className="modal-body scroll-hidden" style={{ ...style, marginTop: "0px", overflow: 'hidden' }}>
          {children}
        </div>
      </div>
    </RsModal>

  );
}

export { Modal };
export type { ModalProps };

