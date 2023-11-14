import { icons } from '@Assets';
import { Image } from '@Components';
import { COUNTRY_ISO_CODE, capitalizeFirstLetter, getPhoto } from '@Utils';
import { ReportHeaderProps } from './interfaces';

import './index.css';

const ReportHeader = ({ details }: ReportHeaderProps) => {

    const { interview_meta_info, candidate_score, candidate_photo } = details || {}
    const { name, role, experience, interview_duration, user_location_info } = interview_meta_info || {}

    const experience_txt = !experience ? "Fresher" : `${experience} ${experience > 1 ? "years" : experience === 1 ? "year" : ""}`
    const { region, city, country } = user_location_info || {}

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



    return (
        <div className={'base-info-container'}>
            <div className={'user-info-container'}>
                <div className={'user-auth-container'}>
                    <div className={'user-photo-container border'}>
                        {candidate_photo ?
                            <Image
                                src={getPhoto(candidate_photo)}
                                height={'100%'}
                                width={'100%'}
                                style={{
                                    objectFit: 'cover',
                                    overflow: 'hidden',
                                    padding: '1px',
                                    borderRadius: '4px'
                                }}
                            />
                            :
                            <Image
                                src={icons.profile}
                                height={80}
                                width={80}
                                style={{
                                    objectFit: 'contain'
                                }}
                            />

                        }
                    </div>
                    {
                        user_location_info ?
                            <div className={'user-address-container'}>
                                <div>
                                    <span className={'screen-des'}>{city}</span>
                                    {region ? <span className={'screen-des'}>, {region}</span> : <></>}
                                </div>
                                <span className={'screen-des'}>{country === '-' ? "" : getCountryName(country)}</span>
                            </div>
                            :
                            <>
                            </>
                    }
                </div>
                <div className={'user-details-container'}>
                    <div className={'user-heading'}>{capitalizeFirstLetter(name)}</div>
                    <div className={'user-role'}> {`${role} - ${experience_txt}`}</div>
                    <div className={'badge-schedule'}>
                        <div className={'badge-text'}>{interview_duration + " min Interview"}</div>
                    </div>
                </div>
            </div>

            <div className={'user-mark-container'}>
                <span
                    className={'mark-text'}
                    style={{
                        color: colorVariant(candidate_score),
                    }}
                >
                    {candidate_score}
                </span>
            </div>
        </div >
    )
}

export { ReportHeader };
