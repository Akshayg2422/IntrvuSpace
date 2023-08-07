import React from "react";
import { Modal as RsModal } from "reactstrap";
import { GenerateModalProps } from './interfaces'


function GenerateModal({ isOpen, onClose, children, ...rest }: GenerateModalProps) {

    return (
        <RsModal
            fade={false}
            className={`modal-dialog-centered modal-lg`}
            isOpen={isOpen}
            {...rest}
        >
            <div className="bg-primary" style={{
                borderRadius: 6
            }}>
                <div className={"modal-header bg-primary d-flex align-items-center justify-content-center"}>
                    <h6 className={"modal-title text-white"}>{'Create Interview Schedule From JD'}</h6>
                </div>
                <div className="modal-body scroll-hidden">
                    {children}
                </div>
            </div>
        </RsModal>
    );
}

export { GenerateModal };

