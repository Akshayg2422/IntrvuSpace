import { icons } from '@Assets';

import { COUNTRY_ISO_CODE, capitalizeFirstLetter, getPhoto } from '@Utils';
import { PdfReportHeaderProps } from './interfaces';
import { Image, Text, View } from '@react-pdf/renderer';
import { hStyles } from '@Modules'

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

    return (
        <View style={hStyles['base-info-container']}>
            <View style={hStyles['report-header-wrapper']}>
                <View style={hStyles['user-info-container']}>
                    {
                        userAuthCheck() &&
                        <View>
                            <View>
                                <Image
                                    src={candidate_photo ? getPhoto(candidate_photo) : icons.profile}
                                    style={candidate_photo ? hStyles['user-photo-container'] : hStyles['profile-placeholder']}
                                />
                            </View>
                            {
                                user_location_info ? (
                                    <View style={hStyles['location-container']}>
                                        <Image style={hStyles['location-mark']} src={icons.mark} />
                                        <View style={hStyles['location-text-container']}>
                                            {region && region !== '-' ? <Text style={hStyles['location-text']}> {region}</Text> : null}
                                            {country && country !== '-' ? <Text style={hStyles['location-text']}>, {getCountryName(country)}</Text> : null}
                                        </View>
                                    </View>
                                ) : null
                            }

                            {
                                ISP && <Text style={[hStyles['location-text'], { marginTop: '2pt', fontSize: '6pt', marginLeft: '2pt' }]}>{ISP}</Text>
                            }

                        </View>
                    }
                </View>

                <View style={hStyles['user-detail-container']}>
                    <Text style={hStyles['user-heading']}>{capitalizeFirstLetter(name)}</Text>
                    <Text style={hStyles['user-role']}>{`${role} - ${experience_txt}`}</Text>
                    <View style={hStyles['experience-container']}>
                        <Text style={hStyles['experience-text']}>{interview_duration + " min Interview"}</Text>
                    </View>
                </View>

                <View style={hStyles['mark-container']}>
                    <Text style={[hStyles['mark-text'], { color: colorVariant(candidate_score) }]}>
                        {candidate_score}
                    </Text>
                </View>
            </View>
        </View>

    )
}

export { PdfReportHeader };
