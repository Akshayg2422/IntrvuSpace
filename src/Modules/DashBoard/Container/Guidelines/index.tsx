import React from 'react'
import { GuidelinesProps } from './interfaces'
import { color } from '@Themes'
import { Button } from '@Components'


function Guidelines({ scheduleInfo = undefined, loading, heading, guidelines = ['Introduction (5 minutes)', 'Icebreaker/Small Talk (5 minutes)', 'Background and Experience (10 minutes)', 'Behavioral Questions (15 minutes)'], onClick }: GuidelinesProps) {
    return (
        <>
            {!scheduleInfo.is_complete &&
                <div className='h-100 container p-5 d-flex  justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className='mb-0 overflow-auto overflow-hide scroll-y card px-5'>
                            {/* // d-flex justify-content-center align-items-center'> */}
                            <div className='card-body mb-0 '>
                                <h4 className="display-3 mb-0 ">{`Interview for ${heading}`}</h4>

                                <div className='mb-0 mt-3'>
                                    <h3 className="mb-0">Guidelines:</h3>
                                    {
                                        guidelines && guidelines.length > 0 && guidelines.map(each => {
                                            return (
                                                <div className='col mt-3'>
                                                    <div className='row align-items-center'>
                                                        <div style={{
                                                            width: 10,
                                                            height: 10,
                                                            backgroundColor: color.davyGrey,
                                                            borderRadius: 5
                                                        }}>
                                                        </div>
                                                        <p className="text-muted mb-0 ml-3">{each}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div className='text-center py-3 pt-5'>
                                    <Button
                                        loading={loading}
                                        block size={'lg'}
                                        text={scheduleInfo.is_started == false ? 'Start Now' : 'Resume Interview'}
                                        onClick={() => {
                                            if (onClick) {
                                                onClick()
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }

            {scheduleInfo.is_complete ?
                <div className='h-100 container p-5 d-flex  justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div style={{ backgroundColor: '#555555', }} className='mb-0 overflow-auto overflow-hide scroll-y card'>
                            {/* // d-flex justify-content-center align-items-center'> */}
                            <div className='card-body mb-0 '>
                                <h4 className="display-3 mb-0 text-white">{`Interview for ${heading}`}</h4>

                                <div className='mb-0 mt-3'>
                                    <h3 className="mb-0 text-white">{"Your interview is complete. Please check your registered mail address for further details."}</h3>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                : <></>
            }
        </>
    )
}

export { Guidelines }