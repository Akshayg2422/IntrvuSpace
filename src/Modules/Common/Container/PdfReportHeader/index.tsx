import { icons } from '@Assets';

import { COUNTRY_ISO_CODE, capitalizeFirstLetter, getPhoto } from '@Utils';
import { PdfReportHeaderProps } from './interfaces';

import { Document, Page, StyleSheet, Text, View, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    'base-info-container': {
        display: 'flex',
        position: 'relative',
        width: '100%',
    },
    'location-mark': {
        width: '14pt',
        height: '14pt',
        objectFit: 'contain'
    },
    'report-header-wrapper': {
        display: 'flex',
        flexDirection: 'row',
    },
    'user-info-container': {
        flex: 1
    },
    'user-detail-container': {
        display: 'flex',
        flex: 1,
        alignItems: 'center'
    },
    'mark-container': {
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end'
    },
    'profile-placeholder': {
        height: '50pt',
        width: '50pt',
        objectFit: 'contain'
    },
    'location-container': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '10pt'
    },
    'location-text-container': {
        display: 'flex',
        flexDirection: 'row',

    },
    'location-text': {
        fontSize: '12pt',
        color: '#5a5d73'
    },
    'user-heading': {
        fontSize: '24pt',
        color: '#014d0d'
    },
    'user-role': {
        fontSize: '10pt',
        textTransform: 'capitalize',
        marginVertical: '5pt',
        color: '#014d0d'
    },
    "mark-text": {
        fontSize: '35pt',
    },
    'experience-container': {
        marginTop: '2pt',
        backgroundColor: '#e0fad9',
        paddingHorizontal: '18pt',
        paddingVertical: '7pt',
        borderRadius: '50%'
    },
    'experience-text': {
        fontSize: '10pt',
        color: '#4cc916'
    }
});




const PdfReportHeader = ({ details }: PdfReportHeaderProps) => {

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


    // .base-info-container {
    //     display: flex;
    //     position: relative;
    //     width: 100%;
    //     margin-top: 50px;
    // }

    // .report-header-wrapper {
    //     display: flex;
    //     flex: 1;
    // }

    // .user-info-container {
    //     color: var(--secondary);
    //     display: flex;
    // }

    // .user-auth-container {
    //     display: flex;
    //     flex-direction: column;
    // }

    // .user-address-container {
    //     margin-top: 8px;
    //     display: flex;
    //     flex-direction: row;
    //     justify-content: center;
    //     align-items: center;
    // }

    // .user-photo-container {
    //     display: flex;
    //     width: 100px;
    //     height: 100px;
    //     align-items: center;
    //     justify-content: center;
    // }

    // .user-photo-containers {
    //     display: flex;
    //     width: 32px;
    //     height: 32px;
    //     align-items: center;
    //     justify-content: center;
    // }

    // .user-details-container-center {
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    // }

    // .user-details-container-left {
    //     margin-left: 25px;
    //     display: flex;
    //     flex-direction: column;
    // }

    // .user-mark-container {
    //     position: absolute;
    //     top: 0;
    //     right: 0;
    // }

    // .user-heading {
    //     font-size: 36px;
    //     font-weight: 700;
    //     line-height: 1;
    //     color: var(--secondary);
    // }

    // .user-role {
    //     font-size: 12px;
    //     font-weight: 600;
    //     text-transform: capitalize;
    //     margin-top: 10px;
    //     margin-bottom: 5px;
    // }

    // .mark-text {
    //     font-size: 60px;
    //     font-weight: 700;
    //     color: var(--secondary);


    // }



    return (
        // <div className={'base-info-container'}>
        //     <div className={'report-header-wrapper user-info-container'}>
        //         {
        //             userAuthCheck() &&
        //             <div className={'user-auth-container'}>

        //                 <div>
        //                     {
        //                         candidate_photo ?
        //                             <div className={'user-photo-container'}>
        //                                 <Image
        //                                     src={getPhoto(candidate_photo)}
        //                                     height={'100%'}
        //                                     width={'100%'}
        //                                     style={{
        //                                         objectFit: 'cover',
        //                                         overflow: 'hidden',
        //                                         borderRadius: '4px'
        //                                     }}
        //                                 />
        //                             </div>
        //                             :
        //                             <Image
        //                                 src={icons.profile}
        //                                 width={70}
        //                                 height={70}
        //                                 style={{
        //                                     objectFit: 'contain',
        //                                     marginBottom: '15px',
        //                                 }}
        //                             />
        //                     }
        //                 </div>

        //                 {
        //                     user_location_info ? (
        //                         <div>
        //                             <Image src={icons.mark} width={20} height={20} style={{ objectFit: 'contain' }} />
        //                             <span className='ml-1'>
        //                                 {region && region !== '-' ? <span className={'screen-des'}> {region}</span> : null}
        //                                 {country && country !== '-' ? <span className={'screen-des'}>, {getCountryName(country)}</span> : null}
        //                             </span>
        //                         </div>
        //                     ) : null
        //                 }

        //                 {ISP && <div className={'ml-1'}>
        //                     <span className={'screen-des'}>  {ISP}</span>
        //                 </div>}

        //             </div>
        //         }
        //     </div>

        //     <div className={'report-header-wrapper user-details-container-center text-secondary'} >
        //         <div className={'user-heading'}>{capitalizeFirstLetter(name)}</div>
        //         <div className={'user-role'}> {`${role} - ${experience_txt}`}</div>
        //         <div className={'badge-schedule'}>
        //             <div className={'badge-text'}>{interview_duration + " min Interview"}</div>
        //         </div>
        //     </div>

        //     <div className='report-header-wrapper justify-content-end'>
        //         <h1
        //             className={'mark-text m-0 p-0 mt--4 '}
        //             style={{
        //                 color: colorVariant(candidate_score),
        //             }}
        //         >
        //             {candidate_score}
        //         </h1>
        //     </div>

        // </div >

        <View style={styles['base-info-container']}>
            <View style={{ ...styles['report-header-wrapper'] }}>
                <View style={styles['user-info-container']}>
                    {
                        userAuthCheck() &&
                        <View>
                            <div>
                                {
                                    candidate_photo ?
                                        <div className={'user-photo-container'}>
                                            <Image
                                                src={getPhoto(candidate_photo)}
                                            />
                                        </div>
                                        :
                                        <Image
                                            style={styles['profile-placeholder']}
                                            src={icons.profile}
                                        />
                                }
                            </div>
                            {
                                user_location_info ? (
                                    <View style={styles['location-container']}>
                                        <Image style={styles['location-mark']} src={icons.mark} />
                                        <View style={styles['location-text-container']}>
                                            {region && region !== '-' ? <Text style={styles['location-text']}> {region}</Text> : null}
                                            {country && country !== '-' ? <Text style={styles['location-text']}>, {getCountryName(country)}</Text> : null}
                                        </View>
                                    </View>
                                ) : null
                            }

                            {
                                ISP && <Text style={[styles['location-text'], { marginTop: '2pt', fontSize: '10pt', marginLeft: '2pt' }]}>{ISP}</Text>
                            }

                        </View>
                    }
                </View>



                <View style={styles['user-detail-container']}>
                    <Text style={styles['user-heading']}>{capitalizeFirstLetter(name)}</Text>
                    <Text style={styles['user-role']}>{`${role} - ${experience_txt}`}</Text>
                    <View style={styles['experience-container']}>
                        <Text style={styles['experience-text']}>{interview_duration + " min Interview"}</Text>
                    </View>
                </View>

                <View style={styles['mark-container']}>
                    <Text style={[styles['mark-text'], { color: colorVariant(candidate_score) }]}>
                        {candidate_score}
                    </Text>
                </View>
            </View>
        </View>

    )
}

export { PdfReportHeader };
