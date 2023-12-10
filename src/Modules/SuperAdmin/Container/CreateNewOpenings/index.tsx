import { Button, Image, StatusIcon } from '@Components';
import { CreateNewProps } from './interfaces';


function CreateNewOpenings({ title, keyPoints, image, buttonText, onButtonClick }: CreateNewProps) {

    return (

        <div className={`container pt-lg-6 pt-md-6 pt-sm-0 pt-6`}>
            <div className={"mb-6"}>
                <div className={'row'}>
                    <div className={'col-lg-5'}>
                        <div>
                            <div>
                                <span
                                    className={"mb-0 text-secondary"}
                                    style={{ fontWeight: "800", fontSize: 18 }}
                                >
                                    {title}
                                </span>
                            </div>
                            <div>
                                <span className={"display-3 text-secondary font-weight-bolder mb-0 ls-1"}>
                                    Create Openings
                                </span>
                            </div>
                            {/* <div style={{ marginTop: -11 }}>
                                <span className={"display-3 text-secondary font-weight-bolder ls-1"}>
                                    & Add Candidates
                                </span>
                            </div> */}

                            <div className={"pt-3"}>
                                <span
                                    className={"text-secondary"}
                                    style={{ fontSize: 14, fontWeight: "500" }}
                                >
                                    {"Create a job description and add the candidates,"} <br />
                                    {"Let us take care of the rest of you!"}
                                </span>
                            </div>

                            <div className={'ml-md--1 ml-lg--1'} style={{ paddingTop: 35 }}>
                                {keyPoints.map((item) => {
                                    const { description, description2 } = item;
                                    return (
                                        <>
                                            <div className="row ml-md-1 ml-sm-0 ml-1">
                                                <div>
                                                    <StatusIcon />
                                                </div>
                                                <span
                                                    className="col-11 text-secondary"
                                                >
                                                    <span className={'point-heading'}>{description}<small className={'point-sub-heading'}>{description2}</small></span>
                                                </span>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>

                            <div className={"mt-md-5 mt-lg-5 mt-sm-0 mt-4 btn-wrapper ls-0"}>
                                <Button
                                    block
                                    text={buttonText}
                                    onClick={onButtonClick}
                                />
                            </div>

                        </div>
                    </div>
                    <div className={'col-lg-7 col-sm-12'}>
                        <div className={'text-center display-3 font-weight-bolder text-secondary mt-md--2 pt-sm-0 pt-3'}>
                            How it works ?
                        </div>
                        <div className={"text-center mt-4"}>
                            <Image
                                src={image}
                                width={"100%"}
                                height={"100%"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { CreateNewOpenings }
