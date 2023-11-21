import { InputHeading } from '@Components';
import React, { useEffect, useRef } from 'react';
import { FormGroup, Input as RsInput } from 'reactstrap';
import { InputProps } from './interfaces';

const Input = React.forwardRef(({ id, className, heading, variant = 'default', isMandatory, textColor, noSpace, ...rest }: InputProps, ref: any) => {


    return (
        <FormGroup className={noSpace ? 'm-0 b-0' : ""}>
            <InputHeading heading={heading} id={id} isMandatory={isMandatory} />
            <RsInput ref={ref}   className={`${className} ${variant !== 'default' && 'form-control-' + variant} form-control-md`} id={id} {...rest} onWheel={event => event.currentTarget.blur()} />
        </FormGroup>
    );
});

export { Input };
export type { InputProps }; 


// import { InputHeading } from '@Components';
// import React, { useEffect, useRef } from 'react';
// import { FormGroup, Input as RsInput } from 'reactstrap';
// import { InputProps } from './interfaces';

// const Input = React.forwardRef(({ id, className, heading, variant = 'default', isMandatory, textColor, noSpace, ...rest }: InputProps, ref: any) => {
 
//     const inputRef = useRef<any>(null);

//     useEffect(() => {
//         if (ref && ref.current) {
//             ref.current.focus();
//         }
//     }, [ref]);

//     return (
//         <FormGroup className={noSpace ? 'm-0 b-0' : ""}>
//             <InputHeading heading={heading} id={id} isMandatory={isMandatory} />
//             <RsInput ref={inputRef}  className={`${className} ${variant !== 'default' && 'form-control-' + variant} form-control-md`} id={id} {...rest} onWheel={event => event.currentTarget.blur()} />
//         </FormGroup>
//     );
// });

// export { Input };
// export type { InputProps }; 


