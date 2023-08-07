import React from "react";
import { Modal as RsModal } from "reactstrap";
import { GenerateModalProps } from './interfaces'


function GenerateModal({ isOpen, onClose, children, title, ...rest }: GenerateModalProps) {

    return (
        <RsModal
            fade={false}
            className={`modal-dialog-centered  modal-lg`}
            isOpen={isOpen}
            {...rest}
        >
            <div className={`modal-header bg-primary d-flex align-items-center justify-content-center`}>
                <h6 className={"modal-title text-white"}>{title}</h6>
            </div>
            <div className={`modal-body scroll-hidden bg-primary text-center`}>
                {children}
            </div>
        </RsModal>
    );
}

export { GenerateModal };

