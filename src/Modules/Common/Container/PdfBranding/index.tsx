import React from 'react'
import { View, Image, Link } from '@react-pdf/renderer';
import { icons } from '@Assets';
import { rStyles } from '@Modules'


function PdfBranding() {
    return (
        <View style={rStyles['brand-container']} wrap={false}>
            <Link src={"https://www.intrvu.space"}>
                <Image src={icons.poweredBy} style={rStyles['logo']} />
            </Link>
        </View >
    )
}

export { PdfBranding }