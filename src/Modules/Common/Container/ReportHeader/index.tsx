import { icons } from '@Assets';
import { Image } from '@Components';
import { COUNTRY_ISO_CODE, capitalizeFirstLetter, getPhoto } from '@Utils';
import { ReportHeaderProps } from './interfaces';

import './index.css';

const ReportHeader = ({ details }: ReportHeaderProps) => {

    const { interview_meta_info, candidate_score, candidate_photo } = details || {}
    const { name, role, experience, interview_duration, user_location_info } = interview_meta_info || {}

    const experience_txt = !experience ? "Fresher" : `${experience} ${experience > 1 ? "years" : experience === 1 ? "year" : ""}`
    const { ISP, region, city, country } = user_location_info || {}

    const colorVariant = (percentage: any) => {
        if (percentage <= 20) return "red";
        if (percentage <= 40) return "orange";
        if (percentage <= 60) return "#ebeb1b";
        if (percentage <= 80) return "green";
        return "#FFD700";
    };

    function getCountryName(code: string) {
        return COUNTRY_ISO_CODE.find((country) => country.code === code)?.name
            ? COUNTRY_ISO_CODE.find((country) => country.code === code)?.name
            : code;
    }


    function userAuthCheck() {
        return !!(
            candidate_photo ||
            (city !== '-' && city !== '') ||
            (region !== '-' && region !== '') ||
            (country !== '-' && country !== '') ||
            ISP
        );
    }


    return (
        <div className={'base-info-container'}>
            <div className={'report-header-wrapper user-info-container'}>
                {
                    userAuthCheck() &&
                    <div className={'user-auth-container'}>

                        <div>
                            {
                                candidate_photo ?
                                    <div className={'user-photo-container'}>
                                        <Image
                                            src={getPhoto(candidate_photo)}
                                            height={'100%'}
                                            width={'100%'}
                                            style={{
                                                objectFit: 'cover',
                                                overflow: 'hidden',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>
                                    :
                                    <Image
                                        src={icons.profile}
                                        width={70}
                                        height={70}
                                        style={{
                                            objectFit: 'contain',
                                            marginBottom: '15px',
                                        }}
                                    />
                            }
                        </div>

                        {
                            user_location_info ? (
                                <div>
                                    <Image src={icons.mark} width={20} height={20} style={{ objectFit: 'contain' }} />
                                    <span className='ml-1'>
                                        {region && region !== '-' ? <span className={'screen-des'}> {region}</span> : null}
                                        {country && country !== '-' ? <span className={'screen-des'}>, {getCountryName(country)}</span> : null}
                                    </span>
                                </div>
                            ) : null
                        }

                        {ISP && <div className={'ml-1'}>
                            <span className={'screen-des'}>  {ISP}</span>
                        </div>}

                    </div>
                }
            </div>

            <div className={'report-header-wrapper user-details-container-center text-secondary'} >
                <div className={'user-heading'}>{capitalizeFirstLetter(name)}</div>
                <div className={'user-role'}> {`${role} - ${experience_txt}`}</div>
                <div className={'badge-schedule'}>
                    <div className={'badge-text'}>{interview_duration + " min Interview"}</div>
                </div>
            </div>

            <div className='report-header-wrapper justify-content-end'>
                <h1
                    className={'mark-text m-0 p-0 mt--4 '}
                    style={{
                        color: colorVariant(candidate_score),
                    }}
                >
                    {candidate_score}
                </h1>
            </div>

        </div >
    )
}

export { ReportHeader };
