import React from 'react'
import { Button, Card } from '@Components'
import { useWindowDimensions } from '@Hooks'
import { Guidelines } from '@Modules'
import { color } from '@Themes'


function UploadJdCard({ openAddJdModal }) {
    
    const guidelines = ['Introduction (5 minutes)', 'Icebreaker/Small Talk (5 minutes)', 'Background and Experience (10 minutes)', 'Behavioral Questions (15 minutes)']

    return (

        <div className={'container mt--2'}>
            <div className='h-100 p-5 d-flex bg-white justify-content-center align-items-center'>
                <div className='d-flex justify-content-center align-items-center'>
                    <div>
                        {/* <h4 className="display-3 mb-0 text-white">{`Interview for ${heading}`}</h4> */}
                        <div className="text-black" style={{ fontSize: '50px' }}>
                            <div className={'row justify-content-center'}>
                                <div>Upload JD</div>
                                <div className={'px-2'}>&</div>
                                <div>Start Interview</div>
                            </div>
                        </div>

                        <div className='mt-3'>
                            <h3 className="mb-0 text-black">Guidelines:</h3>

                            {
                                guidelines && guidelines.length > 0 && guidelines.map(each => {
                                    return (
                                        <div className='col mt-3'>
                                            <div className='row align-items-center'>
                                                <div style={{
                                                    width: 10,
                                                    height: 10,
                                                    backgroundColor: color.black,
                                                    borderRadius: 5
                                                }}>

                                                </div>
                                                <p className="text-muted mb-0 ml-3 text-black">{each}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className='text-center py-2'>

                            {openAddJdModal()}

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export { UploadJdCard }