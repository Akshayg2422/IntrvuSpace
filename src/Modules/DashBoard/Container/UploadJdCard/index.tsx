import React from 'react'
import { Button } from '@Components'
import { color } from '@Themes'
import { showCreateJddModal } from '@Redux'
import { image } from '@Assets';
import { Col, Container, Row } from 'reactstrap';
import { useDispatch } from 'react-redux'

function UploadJdCard() {

    const dispatch = useDispatch();

    const insightsdAndReports = [
        { id: 1, description: "Interview video recording" },
        { id: 2, description: "Skill Matrix Reports" },
        { id: 3, description: "Communication Reports" },
        { id: 4, description: "Aptitude Report" },
        { id: 5, description: "Personality Trait Report" },
    ];

    return (

        <div className={`pt-sm-6`}>
            <Container>
                <div className="mb-6">
                    <Row>
                        <Col lg="5">
                            <div className="mt-5 ml-lg-5">
                                <div>
                                    <span className="display-3 text-secondary font-weight-bolder mb-0 ls-1">
                                        Insights & Reports
                                    </span>
                                </div>
                                <div className={'display-3 text-secondary font-weight-bolder mb-0 ls-1'}>
                                    Upon completion of the interview, Get access  to interview view video recording and detailed curated reports
                                </div>

                                <div className="" style={{ paddingTop: 35 }}>
                                    {insightsdAndReports.map((item) => {
                                        return (
                                            <>
                                                <div className="pt-2 row">
                                                    <span className={'col-1 ni ni-check-bold text-green pt-2'} />
                                                    <span
                                                        className="col-11 text-default"
                                                    >
                                                        <p>{item.description}</p>
                                                    </span>
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                            </div>
                        </Col>
                        <Col lg="7" sm="12">
                            <div>
                                <img
                                    src={image.MockEazy2}
                                    width={"600px"}
                                    height={"100%"}
                                    style={{ borderRadius: "20px" }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>

        // <div className='d-flex justify-content-center align-items-center'>
        //     <div className={'col-md-8 col-lg-8 col-sm-8 card p-4'}>
        //         <div className='d-flex justify-content-center align-items-center'>
        //             <div className={'row align-items-start pl-5'}>
        //                 <div className="text-black display-2 pl-2" style={{ fontSize: '50px' }}>
        //                     <div className={'row'}>
        //                         <div>Upload JD</div>
        //                         <div className={'px-2'}>&</div>
        //                         <div>Begin Interview</div>
        //                     </div>
        //                 </div>
        //                 <div className='mt-3'>
        //                     {
        //                         headingAndSubtext && headingAndSubtext.length > 0 && headingAndSubtext.map((item, index) => {
        //                             const key = Object.keys(item)[0];
        //                             const value = item[key];

        //                             return (
        //                                 <div className='col mt-2' key={index}>
        //                                     <div className='row align-items-center'>
        //                                         <div style={{
        //                                             width: 10,
        //                                             height: 10,
        //                                             backgroundColor: color.primary,
        //                                             borderRadius: 5
        //                                         }}></div>

        //                                         <div className="ml-3">
        //                                             <p className="h3 mb-0 text-black">{key}</p>
        //                                         </div>
        //                                     </div>
        //                                     <p style={{ fontSize: '14px' }} className={'col'}>{value}</p>
        //                                 </div>
        //                             );
        //                         })
        //                     }
        //                 </div>

        //             </div>
        //         </div>


        //         <div className='pb-4'>
        //             <p className="mb-0 text-center h4 font-weight-500 pl-4 ml-2">{'We are committed to providing you with a streamlined and comprehensive virtual interview experience. Your active involvement will lead to valuable insights into your compatibility with the job role.'}</p>
        //             <div className='mt-4'></div>
        //             <Button
        //                 block
        //                 text={'Create Interview'}
        //                 onClick={() => {
        //                     dispatch(showCreateJddModal())
        //                 }} />
        //         </div>
        //     </div>
        // </div>


    )
}

export { UploadJdCard }