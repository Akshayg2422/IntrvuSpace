import { videos } from '@Assets';
import { useEffect } from "react";
import { Modal as RsModal } from "reactstrap";
import { GenerateModalProps } from './interfaces';

function GenerateModal({ isOpen, onClose, children, title, ...rest }: GenerateModalProps) {


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
                    <div className={`modal-header`}>
                        {title && <div className='display-3 text-primary font-weight-700'>
                            {title}
                        </div>}
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

