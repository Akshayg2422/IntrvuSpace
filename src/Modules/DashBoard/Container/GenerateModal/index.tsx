import React, { useRef, useState, useEffect } from "react";
import { Modal as RsModal } from "reactstrap";
import { GenerateModalProps } from './interfaces'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { videos } from '@Assets';

function GenerateModal({ isOpen, onClose, children, title, ...rest }: GenerateModalProps) {

    return (
        <RsModal
            fade={false}
            className={`modal-dialog-centered modal-xl rounded`}
            isOpen={isOpen}
            {...rest}
        >
            <div className="position-relative">
                <video
                    autoPlay
                    loop
                    muted
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -1,
                        borderRadius: 6,
                        marginBottom: -10


                        // opacity: 0.3, // Set the desired opacity value
                        // marginBottom: -10
                    }}
                >
                    <source src={videos.background} type="video/mp4" />
                </video>
                <div className="position-absolute" style={{ top: 0, left: 0, right: 0, bottom: 0, borderRadius: 7 }}>
                    <div className={"modal-header"}>
                        <div className="col text-center">
                            <h6 className={"modal-title text-black font-weight-700"}>{title}</h6>
                        </div>
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

                    <div className={`modal-body scroll-hidden text-center`} >
                        {children}
                    </div>
                </div>
            </div>


        </RsModal>
    );
}

export { GenerateModal };

