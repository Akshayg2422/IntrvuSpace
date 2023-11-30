import { useRef } from 'react'
import { InputHeading, Option, Image } from '@Components';
import Select2 from 'react-select2-wrapper';
import { FormGroup } from 'reactstrap';
import { DropDownProps } from './interfaces';
import { icons } from '@Assets';
import './index.css'

import { Select2Type } from 'react-select2-wrapper';

function DropDown({ id, heading, disabled, placeHolder, selected, data, onChange, className = 'form-control ', Class, noSpace }: DropDownProps) {

    const select2Ref = useRef<Select2Type | null>(null); // Create a ref for the Select2 component


    function proceedOnChange(e: any) {
        const selectedId = e.target.value
        if (onChange) {
            const selectedItemById = data?.find((option: Option) => {
                return option.id === selectedId
            })
            if (selectedItemById) {
                onChange(selectedItemById)
                // setSelected(selectedItemById)
            }
        }

    }

    function openSelect2Dropdown() {
        if (select2Ref.current) {
            select2Ref.current.el.select2('open');
        }
    }
    return (
        <FormGroup className={noSpace ? 'm-0 b-0' : ""}>
            <InputHeading heading={heading} Class={Class} id={id} />
            <div
                style={{
                    position: "relative",
                }}>
                <Select2
                    id={id}
                    ref={select2Ref}
                    className={className}
                    data-minimum-results-for-search={'Infinity'}
                    data={data}
                    value={selected && selected.id}
                    options={
                        {
                            placeholder: placeHolder,
                            disabled: disabled,
                            allowArrow: true,
                        }
                    }
                    onChange={proceedOnChange}
                >


                </Select2>
                <span
                    style={{
                        position: 'absolute',
                        right: "10%",
                        top: "25%",
                        cursor: 'pointer'
                    }}
                    onClick={openSelect2Dropdown}
                >
                    <Image
                        src={icons.downArrowBlack}
                        height={10}
                        width={12}
                        style={{
                            objectFit: 'contain',
                        }} />
                </span>
            </div>
        </FormGroup>
    )
}

export { DropDown };
