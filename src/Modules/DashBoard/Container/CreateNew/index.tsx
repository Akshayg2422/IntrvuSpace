import { icons } from '@Assets'
import { Button, Image } from '@Components';
import { CreateNewProps } from './interfaces';
import './index.css';


function CreateNew({ children, title, description, keyPoints, image, buttonText, onButtonClick }: CreateNewProps) {

    return (
        <div className={'opening-card-container'}>
            {
                children
            }
            <div className={'opening-card-row-container '}>
                <div className={'section-1'}>
                    <div className={'section-1-content'}>
                        <span className='text-heading lh-110' style={{ whiteSpace: "pre-line" }}>
                            {
                                title
                            }
                        </span>

                        <div className={'text-des text-des-container'}>
                            {
                                description
                            }
                        </div>

                        <div className={'points-container'}>
                            {keyPoints.map((item: any) => {
                                const { description, description2 } = item;
                                return (
                                    <div className={'d-flex align-items-center'} style={{
                                        marginTop: '18px'
                                    }}>
                                        <Image height={9} width={12} src={icons.check} style={{
                                            objectFit: 'contain',
                                        }} />
                                        <div style={{
                                            marginLeft: '8px'
                                        }}>
                                            <span className={'point-heading'}>{description}<small className={'point-sub-heading'}>{description2}</small></span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={'create-opening-btn'}>
                        <Button
                            block
                            text={buttonText}
                            onClick={onButtonClick}
                        />
                    </div>

                </div>

                <div className={'section-2'}>
                    <Image
                        src={image}
                        className={'section-image'}
                        height={'90%'}
                        width={'90%'}
                    />
                </div>
            </div>
        </div>
    )
}

export { CreateNew }
