import { useState } from 'react'
import { InputHeading } from '@Components';

import {
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";
import classnames from "classnames";
import './index.css'
import { InputPasswordProps } from './interfaces'


function InputPassword({ id, className, heading, placeholder = 'Password', variant = 'default', isMandatory, textColor, noSpace, ...rest }: InputPasswordProps) {

    const [focus, setFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormGroup >
            <InputHeading heading={heading} id={id} isMandatory={isMandatory} />

            <InputGroup
                className={classnames("input-group-merge", {
                    focused: focus,
                })}
            >
                <Input
                    className={`${className} ${variant !== 'default' && 'form-control-' + variant} form-control-md`}
                    id={id}
                    {...rest}
                    placeholder={placeholder}
                    type={showPassword ? "text" : "password"}
                    onFocus={(e) => setFocus(true)}
                    onBlur={(e) => setFocus(false)}
                />
                <InputGroupAddon addonType="append" >
                    <InputGroupText>
                        <i className={`fas fa-eye ${showPassword ? 'active' : 'in-active'}`} style={{ fontSize: '16px' }} onClick={() => { setShowPassword(!showPassword) }} />
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </FormGroup>
    )
}

export { InputPassword };
