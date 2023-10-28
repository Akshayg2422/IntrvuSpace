import { DesignationItemProps } from './interfaces';
import { NoDataFound, Button, MenuBar, Image, Badge } from '@Components';
import { icons } from '@Assets';
import { Card, CardBody, CardFooter } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useNavigation } from '@Hooks';
import { ROUTES } from '@Routes';
import { capitalizeFirstLetter } from '@Utils';

function DesignationItem({ item, onAdd, onEdit, onView, onClick }: DesignationItemProps) {

    const MENU = [{ id: 0, name: 'Edit', icon: icons.edit }];
    const [formattedDate, setFormattedDate] = useState('');
    const { goTo, goBack } = useNavigation()

    useEffect(() => {
        const dateObj = new Date(item.starts_from);
        const option: any = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        const formattedDate = dateObj.toLocaleDateString('en-US', option);

        setFormattedDate(formattedDate);
    }, [])

    return (
        <>
            {/* <div className='text-right mb-3'>
                {onAdd && (
                    <Button
                        text={'Create Schedule'}
                        block
                        onClick={() => {
                            if (onAdd) {
                                onAdd(item);
                            }
                        }}
                    />
                )}
            </div> */}
            <Card className='rounded px-sm-5 py-sm-4 p-3'
                style={{
                    borderWidth: "1px",
                    borderColor: "#d3deff",
                    backgroundColor: "transparent"
                }}
            >
                <CardBody className='pt-1 pb-1 px-0'>
                    {/* <div>
                        {knowledge_group_variant && knowledge_group_variant.length > 0 ? (
                            knowledge_group_variant.map((each: any, index: number) => {
                                console.log('knowledge_group_variant---------------------->', each);
                                const { id, name } = each;
                                const isFirst = index === 0;
                                return (
                                    <><div
                                        key={id}
                                        className={`${isFirst ? '' : 'my-2'} mx-1 `}
                                    >
                                        <div className='d-flex align-items-center'>
                                            <h1
                                                className='text-black pointer col'
                                                onClick={(e) => {
                                                    if (onView) {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        onView(item, each);
                                                    }
                                                }}
                                            >{name}</h1>

                                            <div className='d-flex justify-content-between col-sm-5'>
                                                <div className='d-flex align-items-center no-border' title='Total Candidates'>
                                                    <Image src={icons.profile} height={21} width={20} />
                                                    <span className={'pl-1'}>{'34'}</span>
                                                </div>
                                                <div className='d-flex align-items-center' title='Attended Candidates'>
                                                    <Image src={icons.videoConference} height={20} width={20} />
                                                    <span className={'pl-1'}>{'34'}</span>
                                                </div>
                                                <div className='d-flex align-items-center' title='Yet to Attend'>
                                                    <Image src={icons.timeline} height={18} width={18} />
                                                    <span className={'pl-1'}>{'0'}</span>
                                                </div>
                                                <div className='d-flex align-items-center' title='Selected'>
                                                    <Image src={icons.selected} height={20} width={20} />
                                                    <span className={'pl-1'}>{'10'}</span>
                                                </div>
                                                <div className='d-flex align-items-center' title='Rejected'>
                                                    <Image tintColor={'#001532'} src={icons.rejected} height={20} width={20} />
                                                    <span className={'pl-1'}>{'24'}</span>
                                                </div>
                                            </div>


                                            {onEdit && (
                                                <div className=''>
                                                    <MenuBar
                                                        menuData={MENU}
                                                        onClick={(selected) => {
                                                            if (selected?.id === MENU[0].id) {
                                                                if (onEdit) {
                                                                    console.log(
                                                                        'item----------->',
                                                                        JSON.stringify(item) +
                                                                        '======' +
                                                                        'each------>',
                                                                        JSON.stringify(each)
                                                                    );

                                                                    onEdit(item, each);
                                                                }
                                                            }
                                                        }} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="px-3">
                                            <h5 className="mb-0 pointer mt--3" style={{ marginTop: -10 }}>{'Experience'}</h5>
                                            <div className="row pt-2 h5" style={{ marginTop: -10 }}>
                                                <div className="col-2 mb-0 pointer text-muted" style={{ maxWidth: '8rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                                    {'Department'}
                                                </div>
                                                <span>/</span>
                                                <div className="col-2 mb-0 pointer text-muted" style={{ maxWidth: '8rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                                    {'Sector'}
                                                </div>
                                            </div>
                                            <div style={{ fontSize: '14px' }} className={'text-black'}>{'Total 3+yrs of experience in UI development using React (LifeCycle, HOC, State, Context, ReactDOM, Render, Hydrate, Memo, DOM API & Virtual DOM, Hooks, SFC, React Redux ).Experience developing Web-based UI using Javascript (ES6), HTML5, CSS3, BootStrap etc.Firm understanding of Object-Oriented principles, design patterns, and software design/architecture best practices.Develop Restful Service and Restful service integration with UI.Good problem-solving skills, DS and Algorithm.Should have sound knowledge in testing.Ability to communicate technical concepts clearly and concisely both verbally and in writing.Ability to collaboratively work through technical issues in a professional manner, making design considerations and trade-offs as needed.'}</div>
                                        </div>
                                    </div>
                                    </>
                                );
                            })
                        ) : (
                            <div className='d-flex align-items-center justify-content-center h-100'>
                                <NoDataFound />
                            </div>
                        )}
                    </div>  */}
                    <div className='text-secondary'>
                        {item ? (
                            <div
                                key={item.id}
                                className="mx-0"
                            >
                                <div className='d-flex align-items-center mb-3 justify-content-between'>
                                    <div className=''>

                                        <div className='d-flex flex-sm-row flex-column align-items-sm-center'>
                                            <span className='col p-0 m-0 font-weight-800' style={{fontSize: 26}}
                                            >{capitalizeFirstLetter(item.job_description.position)}</span>
                                            {/* <div className={'ml-3 px-3'} style={{backgroundColor:'#ebe4ff', borderRadius:"50px", height:"30px"}}> <h4 className=' text-primary font-weight-900 pt-1 px-1'>{item.candidate_details.selected_candidates} Selected</h4></div> */}
                                            <div className='mt-sm-1 pl-sm-3 pl-sm-1'>
                                            <Badge
                                                className="text-primary text-lowercase"
                                                style={{
                                                    backgroundColor: "#ebe4ff",
                                                    borderRadius: 30,
                                                    fontSize: 12,
                                                    borderWidth: 0,
                                                }}
                                                text={item.candidate_details.selected_candidates ? `${item.candidate_details.selected_candidates} Selected` : ""}
                                            />
                                            </div>
                                        </div>
                                        <h5 className="m-0 font-weight-500">{item.job_description.experience}</h5>
                                    </div>
                                    <div className='ml-sm-0'>
                                        <Button style={{ fontSize: "15px", borderColor:"#d8dade",borderRadius:4 }}
                                            outline
                                            size='lg'
                                            className={'px-md-5 m-0'}
                                            text={'View Details'}
                                            onClick={(e) => {
                                                if (onView) {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    onView(item);
                                                }
                                            }}
                                        />
                                        <div className=' d-flex align-items-center justify-content-center mt-1'>
                                            {
                                                item.is_active ? <> <img src={icons.check} height={20} width={20} style={{
                                                    objectFit: 'contain'
                                                }} />
                                                <h5 className='p-0 font-weight-800 m-0'>Active</h5></> :  <h5 className='p-0 font-weight-800 m-0 text-default'>Closed</h5>
                                            }
                                            
                                        </div>
                                    </div>



                                    {/* <div className='d-flex justify-content-between col-sm-5'>
                                        <div className='d-flex align-items-center no-border' title='Total Candidates'>
                                            <Image src={icons.profile} height={21} width={20} />
                                            <span className={'pl-1'}>{item.candidate_details.total_candidates}</span>
                                        </div>
                                        <div className='d-flex align-items-center' title='Attended Candidates'>
                                            <Image src={icons.videoConference} height={20} width={20} />
                                            <span className={'pl-1'}>{item.candidate_details.attended_candidates}</span>
                                        </div>
                                        <div className='d-flex align-items-center' title='Yet to Attend'>
                                            <Image src={icons.timeline} height={18} width={18} />
                                            <span className={'pl-1'}>{item.candidate_details.yet_to_attend_candidates}</span>
                                        </div>
                                        <div className='d-flex align-items-center' title='Selected'>
                                            <Image src={icons.selected} height={20} width={20} />
                                            <span className={'pl-1'}>{item.candidate_details.selected_candidates}</span>
                                        </div>
                                        <div className='d-flex align-items-center' title='Rejected'>
                                            <Image src={icons.rejected} height={20} width={20} />
                                            <span className={'pl-1'}>{item.candidate_details.rejected_candidates}</span>
                                        </div>
                                    </div> */}


                                    {/* {onEdit && (
                                                <div className=''>
                                                    <MenuBar
                                                        menuData={MENU}
                                                        onClick={(selected) => {
                                                            if (selected?.id === MENU[0].id) {
                                                                if (onEdit) {
                                                                    console.log(
                                                                        'item----------->',
                                                                        JSON.stringify(item) +
                                                                        '======' +
                                                                        'each------>',
                                                                        JSON.stringify(each)
                                                                    );

                                                                    onEdit(item, each);
                                                                }
                                                            }
                                                        }} />
                                                </div>
                                            )} */}
                                </div>
                                <div className="text-default">

                                    <div className=" d-flex flex-wrap pt-2 h5" style={{ marginTop: -10 }}>
                                        <div className="mb-0 p-0 mr-4" >
                                            <b>{item.vacancies}</b><span className='pl-1 font-weight-500'>Vacancies</span>
                                        </div>

                                        <div className="mb-0 p-0 mr-4">
                                            <b>{item.candidate_details.total_candidates}</b><span className='pl-1 font-weight-500'>Candidates added</span>
                                        </div>
                                        <div className=" mb-0 p-0">
                                            <b>{item.interview_duration} min</b><span className='pl-1 font-weight-500'>Duration</span>
                                        </div>
                                    </div>
                                    <div className='mt-3 mb-2' style={{ fontSize: '14px' }} >{item.job_description.details}</div>
                                </div>
                            </div>
                        ) : (
                            <div className='d-flex align-items-center justify-content-center h-100'>
                                <NoDataFound />
                            </div>
                        )}
                    </div>
                </CardBody>
                {/* {knowledge_group_variant && knowledge_group_variant.length > 0 && (
                    <CardFooter>
                        <h6 className={'d-flex justify-content-center m-0 p-0 my--1 text-black'}>
                            {'Created at : 10 mins ago'}
                        </h6>
                    </CardFooter>
                )} */}

                {/* {
                    item && (
                        <CardFooter>
                            <h6 className={'d-flex justify-content-center m-0 p-0 my--1 text-black'}>
                                {`Created at : ${formattedDate}`}
                            </h6>
                        </CardFooter>
                    )
                } */}


            </Card>
        </>
    );
}

export { DesignationItem };
