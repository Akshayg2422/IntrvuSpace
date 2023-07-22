import React, { forwardRef } from 'react'
import { CardProps } from './interfaces'
import {
    Card as RsCard, CardBody, CardTitle, CardHeader
} from "reactstrap";

const Card = forwardRef(({ title, children, ...rest }: CardProps, ref: any) => {
    return (
        <RsCard {...rest} ref={ref}>
            {title && <CardTitle>
                <CardHeader>
                    <h5 className="h3 mb-0">{title}</h5>
                </CardHeader>
            </CardTitle>}
            <CardBody>
                {children}
            </CardBody>
        </RsCard>
    )
})

export { Card }