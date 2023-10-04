import React from "react";
import { ButtonGroupProps } from './interface'


const ButtonGroup = ({ sortData, onClick, selected, size, customWidth = '110px' }: ButtonGroupProps) => {
    return (
        <>
            <div className="btn-group btn-secondary btn-group-toggle shadow-none" data-toggle="buttons">
                {sortData.map((item, index: number) => {
                    const { id, title } = item
                    const isActive = id === selected?.id
                    return (
                        <div
                            style={{ padding: size === "btn-sm" ? '10px' : '' }}
                            className={`btn btn-secondary ${size} ${isActive && 'active'}`}
                            onClick={
                                () => {
                                    if (onClick) { onClick(item) }
                                }}>
                            <input type="radio" name="options" className="align-self-center" />{title}
                        </div>
                    )
                })}
            </div >
        </>
    )
}

export { ButtonGroup }