import { TripleDotProps } from "./interfaces";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Image } from "@Components";
import { icons } from '@Assets'
import './index.css'

function MenuBar({ icon = icons.more, menuData, onClick, direction = "down" }: TripleDotProps) {
  return (
    <div>
      <UncontrolledDropdown direction={direction}>
        <DropdownToggle
          data-toggle={'dropdown'}
          tag={'span'}
          className={'dropdown-container'}
        >
          <Image src={icon} width={20} height={20} />
        </DropdownToggle>
        <DropdownMenu right className={'shadow-none dropdown-menu-items'} style={{ zIndex: 9999 }} >
          {menuData &&
            menuData.length > 0 &&
            menuData.map((el: any, index: number) => {
              const { icon, name } = el;
              return (
                <>
                  <DropdownItem className="menu-items"
                    onClick={(e) => {
                      if (onClick) {
                        onClick(el);
                      }
                    }}
                  >
                    <div className="d-inline-flex justify-content-center align-items-center">
                      {icon && (
                        <Image
                          src={icon}
                          width={18}
                          height={18}
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      )}
                      {name}
                    </div>
                  </DropdownItem>
                </>
              );
            })}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
}

export { MenuBar };
