import { DesignationItemProps } from './interfaces';
import { NoDataFound, Button, MenuBar, Image } from '@Components';
import { icons } from '@Assets';
import { Card, CardBody, CardFooter } from 'reactstrap';

function DesignationItem({ item, onAdd, onEdit, onView, }: DesignationItemProps) {
    console.log('DesignationItem---->', item);

    const { name, knowledge_group_variant } = item;
    const MENU = [{ id: 0, name: 'Edit', icon: icons.edit }];

    return (
        <>
            
            <Card className=''>
                <CardBody className='pt-1 pb-1 px-0'>
                    <div>
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
                    </div>
                </CardBody>
                {knowledge_group_variant && knowledge_group_variant.length > 0 && (
                    <CardFooter>
                        <h6 className={'d-flex justify-content-center m-0 p-0 my--1 text-black'}>
                            {'Created at : 10 mins ago'}
                        </h6>
                    </CardFooter>
                )}
            </Card>
        </>
    );
}

export { DesignationItem };
