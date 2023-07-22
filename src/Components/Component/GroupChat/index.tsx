import React from 'react'
import { GroupChatProps } from './interfaces'
import { Image } from '@Components'
import { icons } from '@Assets'


function GroupChat({ children, title, time, color = 'white', rtl, subTitle, isEdit, isDelete, editOnclick, deleteOnClick }: GroupChatProps) {

    return (
        <div
            className={''}
        >
            <div className="timeline-block" dir={rtl ? "rtl" : undefined}>
                <span className={''}>
                    {/* {icon ? <Image src={icon} width={15} height={15} /> : <i className="ni ni-bell-55" />} */}
                </span>

                <div className="timeline-content">
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h6 className="h5 mt-0 mb-0">{subTitle}</h6>
                            <span className="text-muted text-sm font-weight-bold">
                                {title}
                            </span>
                        </div>
                        <div className="text-right">
                            <small className="text-muted">
                                <i className={`fas fa-clock mr-1 ${rtl && 'ml-1'}`} />
                                {time}
                            </small>
                            {isEdit && <small>
                                <div className=' mx-2 pointer  d-inline-flex  justify-content-center align-items-center'>
                                    <Image src={icons.editEta} onClick={editOnclick} width={12} height={12} style={{ objectFit: 'contain' }} />
                                </div>
                            </small>}
                            {isDelete && <small>
                                <div className='pointer d-inline-flex justify-content-center align-items-center'>
                                    <Image src={icons.deleteCurve} onClick={deleteOnClick} width={12} height={12} style={{ objectFit: 'contain' }} />
                                </div>
                            </small>}
                        </div>
                    </div>
                    <div className='mb-4'>
                        {
                            children
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export { GroupChat }