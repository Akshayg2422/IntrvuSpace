import React from 'react'
import { GuidelinesProps } from './interfaces'
import { color } from '@Themes'
import { Button } from '@Components'

function Guidelines({ loading, heading, guidelines = ['Introduction (5 minutes)', 'Icebreaker/Small Talk (5 minutes)', 'Background and Experience (10 minutes)', 'Behavioral Questions (15 minutes)'], onClick }: GuidelinesProps) {
    return (
        <div className='h-100 container p-5 d-flex  justify-content-center align-items-center'>
            <div className='d-flex justify-content-center align-items-center'>
                <div>
                    <h4 className="display-3 mb-0 text-white">{`Interview for ${heading}`}</h4>

                    <div className='mt-3'>
                        <h3 className="mb-0 text-white">Guidelines:</h3>

                        {
                            guidelines && guidelines.length > 0 && guidelines.map(each => {
                                return (
                                    <div className='col mt-3'>
                                        <div className='row align-items-center'>
                                            <div style={{
                                                width: 10,
                                                height: 10,
                                                backgroundColor: color.white,
                                                borderRadius: 5
                                            }}>

                                            </div>
                                            <p className="text-muted mb-0 ml-3 text-white">{each}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className='text-center py-6'>
                        <Button
                            loading={loading}
                            block size={'lg'}
                            text={'Start Now'}
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
    )
}

export { Guidelines }