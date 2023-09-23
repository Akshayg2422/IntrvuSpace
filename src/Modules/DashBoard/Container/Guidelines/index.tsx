import React from 'react'
import { GuidelinesProps } from './interfaces'
import { color } from '@Themes'
import { Button } from '@Components'
import { useNavigation } from '@Hooks'

function Guidelines({ scheduleInfo = undefined, loading, heading, guidelines = ['Introduction (5 minutes)', 'Icebreaker/Small Talk (5 minutes)', 'Background and Experience (10 minutes)', 'Behavioral Questions (15 minutes)'], onClick }: GuidelinesProps) {
    const { goBack } = useNavigation()

    console.log(JSON.stringify(scheduleInfo) + '=====scheduleInfo');


    return (
        <>
            {!scheduleInfo.is_complete &&
                <div className='h-100 container'>
                    <div className='mb-0 overflow-auto overflow-hide scroll-y'>
                        <div className='card-body mb-0 my-6'>
                            <h1 className="display-2">{`Interview for the role of ${heading}`}</h1>
                            <p className="mt-0 mb-5">{"3 years of experience"}</p>
                            <div className='mb-0 mt-3'>
                                <h5 className="mb-0 text-uppercase">Guidelines:</h5>
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
                                                    <p className="text-muted mb-0 ml-3" style={{ fontSize: '14px' }}>{each}</p>
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
            }

            {scheduleInfo.is_complete ?
                <div className='h-100 container d-flex  justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className='card mb-0 overflow-auto overflow-hide scroll-y'>
                            <div className='card-body mb-0'>
                                <div className="col">
                                    <h1 className="display-4">{`Interview for ${heading}`}</h1>
                                    <p className="mt-0 mb-5">Your interview is complete. Please check your registered mail address for further details.</p>
                                    <div>
                                        <Button text={'Go to Dashboard'} onClick={() => { goBack() }} />
                                    </div>
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