import React from "react";
import { ButtonGroupProps } from './interface'


const ButtonGroup = ({ sortData, onClick, selected, size }: ButtonGroupProps) => {
    return (
        <>
            <div className="btn-group btn-secondary btn-group-toggle" data-toggle="buttons">
                {sortData.map((item, index: number) => {
                    const { id, title } = item
                    const isActive = id === selected?.id
                    return (
                        <label style={{ width: '110px' }} className={`btn btn-secondary ${size} ${isActive && 'active'}`} onClick={() => { if (onClick) { onClick(item) } }}>
                            <input type="radio" name="options" className="align-self-center" />{title}
                        </label>
                    )
                })}
            </div >
        </>
    )
}

export { ButtonGroup }