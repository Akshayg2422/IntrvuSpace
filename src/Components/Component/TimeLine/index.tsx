import React from 'react'
import { TimeLineProps } from './interfaces'
import { Image } from '@Components'
import { icons } from '@Assets'


function TimeLine({ showDotterLine, children, title, time, icon, color = 'white', rtl, subTitle }: TimeLineProps) {

    return (
        <div
            className={`${showDotterLine && 'timeline '} timeline-one-side  `}
            data-timeline-axis-style="dashed"
            data-timeline-content="axis"
        >
            <div className="timeline-block" dir={rtl ? "rtl" : undefined}>
                <span className={`timeline-step badge-${color} bg-primary`}>
                    {icon ? <Image src={icon} width={15} height={15} /> : <i className="ni ni-bell-55" />}
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

export { TimeLine }