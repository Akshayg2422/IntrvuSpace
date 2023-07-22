import { useState } from 'react'
import { TripleDotProps } from './interfaces'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Image } from '@Components'


function MenuBar({ toggleIcon, menuData, onClick }: TripleDotProps) {
    return (
        <div>
            <UncontrolledDropdown>
                <DropdownToggle
                    color=""
                    size="sm"
                    className="text-light">
                    {toggleIcon ? <Image src={toggleIcon} width={20} height={20} /> : <i className="fas fa-ellipsis-v" />}
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                    {menuData && menuData.length > 0 && menuData.map((el: any, index: number) => {
                        const { id, icon, name } = el

                        return (
                            <>
                                <DropdownItem onClick={() => {
                                    if (onClick) {
                                        onClick(el)
                                    }
                                }
                                }>
                                    <div className='d-inline-flex justify-content-center align-items-center'>
                                        {icon && <Image src={icon} width={18} height={18} style={{
                                            objectFit: 'contain'
                                        }} />}
                                        {name}
                                    </div>
                                </DropdownItem>
                            </>
                        )
                    })
                    }
                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    )
}

export { MenuBar }