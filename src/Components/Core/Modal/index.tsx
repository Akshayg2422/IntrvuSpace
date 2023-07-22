import React from "react";
import { ModalProps } from "./interfaces";
import { Modal as RsModal } from "reactstrap";
import { useDynamicHeight } from "@Hooks";

function Modal({ isOpen, children, title, size = "lg",style, onClose, ...rest }: ModalProps) {

  return (
    <RsModal
      fade={false}
      className={`modal-dialog-centered modal-${size}`}
      isOpen={isOpen}
      {...rest}
    >
      <div className={"modal-header"}>
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
      <div className="modal-body scroll-hidden" style={style}>
        {children}
        </div>
    </RsModal>
  );
}

export { Modal };
export type { ModalProps };
