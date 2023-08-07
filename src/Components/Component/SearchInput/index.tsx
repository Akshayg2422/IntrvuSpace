import React, { useEffect, useState } from 'react'
import { translate } from '@I18n'
import { InputHeading } from '@Components'
import { useInput } from '@Hooks'
import { SearchInputProps } from './interfaces'
import { useSelector } from 'react-redux'

function SearchInput({ defaultValue, heading, onSearch }: SearchInputProps) {
    const search = useInput('')
    const [inputStyle, setInputStyle] = useState<any>(false)




    useEffect(() => {
        search.set(defaultValue!)
    }, [defaultValue])



    return (
        <div>
            {heading && <InputHeading heading={heading} />}
            <div className="input-group bg-white border"

            >
                <input
                    type="text"
                    className="form-control bg-transparent border border-0  form-control-md"
                    placeholder={translate("auth.search")!}
                    value={search.value}
                    onChange={search.onChange}
                    onFocus={(e) => {
                        setInputStyle(true)
                    }}
                    onBlur={(e) => {
                        setInputStyle(false)
                    }}
                />
                <span
                    className="input-group-text pointer border border-0"
                    onClick={
                        () => {
                            if (onSearch) {
                                onSearch(search.value)
                            }
                        }
                    }>
                    <i className="fas fa-search" />
                </span>
            </div>
        </div >
    )
}

export { SearchInput }