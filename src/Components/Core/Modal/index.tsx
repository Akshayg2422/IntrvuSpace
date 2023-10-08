import React from "react";
import { ModalProps } from "./interfaces";
import { Modal as RsModal } from "reactstrap";

function Modal({ isOpen, children, title, size = "lg", style, onClose, ...rest }: ModalProps) {

  return (
    <RsModal
      fade={false}
      className={`modal-dialog-centered modal-${size}`}
      style={{
        borderRadius: 0
      }}
      isOpen={isOpen}
      {...rest}
    >
      <div className="modal-content rounded-0 shadow-0">
        <div className={"modal-header mb-0"} style={{
          paddingBottom: '0px'
        }}>
          {title && <h6 className={"modal-title"}>{title}</h6>}
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
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body scroll-hidden" style={{ ...style, marginTop: "0px" }}>
          {children}
        </div>
      </div>
    </RsModal>
  );
}

export { Modal };
export type { ModalProps };

