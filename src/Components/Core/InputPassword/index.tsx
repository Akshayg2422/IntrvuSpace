import { useState } from 'react'

import {
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";
import classnames from "classnames";
import './index.css'

function InputPassword() {

    const [focus, setFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormGroup>
            <InputGroup
                className={classnames("input-group-merge", {
                    focused: focus,
                })}
            >
                <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    onFocus={(e) => setFocus(true)}
                    onBlur={(e) => setFocus(false)}
                />
                <InputGroupAddon addonType="append" >
                    <InputGroupText>
                        <i className={`fas fa-eye ${showPassword ? 'active' : 'in-active'}`} style={{ fontSize: '18px' }} onClick={() => { setShowPassword(!showPassword) }} />
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </FormGroup>
    )
}

export { InputPassword };
