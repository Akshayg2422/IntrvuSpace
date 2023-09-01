import React from 'react'
import { Button, Card } from '@Components'
import { useWindowDimensions } from '@Hooks'
import { Guidelines } from '@Modules'
import { color } from '@Themes'


function UploadJdCard({ openAddJdModal }) {

    const headingAndSubtext = [
        { 'Retrieve Job Description from the Job Portal:': 'Kindly extract the Job Description (JD) from the designated Job Portal source.' },
        { 'Await Swift Interview Generation by Our System:': 'Once the JD is uploaded, our advanced system will promptly generate a tailored interview based on the provided Job Description. This process will be completed within a maximum of 30 seconds.' },
        { 'Engage in the Interview Session:': 'Participate in the generated interview session, where you will encounter thought-provoking questions and scenarios pertinent to the role outlined in the Job Description.' },
        { 'Access Your Interview Report:': 'Subsequent to the interview, you will receive an insightful report detailing your performance, strengths, and areas for potential growth. This report will aid you in gauging your alignment with the job requirements and expectations.' }
    ]

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className={'col-md-8 col-lg-8 col-sm-8 card p-4'}>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className={'row align-items-start pl-5'}>
                        <div className="text-black display-2 pl-2" style={{ fontSize: '50px' }}>
                            <div className={'row'}>
                                <div>Upload JD</div>
                                <div className={'px-2'}>&</div>
                                <div>Begin Interview</div>
                            </div>
                        </div>
                        <div className='mt-3'>
                            {
                                headingAndSubtext && headingAndSubtext.length > 0 && headingAndSubtext.map((item, index) => {
                                    const key = Object.keys(item)[0];
                                    const value = item[key];

                                    return (
                                        <div className='col mt-2' key={index}>
                                            <div className='row align-items-center'>
                                                <div style={{
                                                    width: 10,
                                                    height: 10,
                                                    backgroundColor: color.primary,
                                                    borderRadius: 5
                                                }}></div>

                                                <div className="ml-3">
                                                    <p className="h3 mb-0 text-black">{key}</p>
                                                </div>
                                            </div>
                                            <p style={{ fontSize: '14px' }} className={'col'}>{value}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>

                    </div>
                </div>


                <div className='pb-4'>

                    <p className="mb-0 text-center h4 font-weight-500 pl-4 ml-2">{'We are committed to providing you with a streamlined and comprehensive virtual interview experience. Your active involvement will lead to valuable insights into your compatibility with the job role.'}</p>
                    {openAddJdModal()}

                </div>
            </div>
        </div>


    )
}

export { UploadJdCard }