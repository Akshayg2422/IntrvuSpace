import { TripleDotProps } from './interfaces'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Image } from '@Components'


function MenuBar({ toggleIcon, menuData, onClick }: TripleDotProps) {
    return (
        <div>
            <UncontrolledDropdown>
                <DropdownToggle
                    color=""
                    size={'md'}
                    className="text-light shadow-0">
                    {toggleIcon ?
                        <Image src={toggleIcon} width={18} height={18} /> : <i style={{
                            color: "#637181"
                        }} className="fas fa-ellipsis-v" />}
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow shadow-0" right>
                    {menuData && menuData.length > 0 && menuData.map((el: any, index: number) => {
                        const { icon, name } = el
                        return (
                            <>
                                <DropdownItem onClick={(e) => {
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