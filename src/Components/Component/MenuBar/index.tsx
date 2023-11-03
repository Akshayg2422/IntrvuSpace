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

function MenuBar({ icon = icons.more, menuData, onClick }: TripleDotProps) {
  return (
    <div>
      <UncontrolledDropdown>
        <DropdownToggle
          data-toggle={'dropdown'}
          tag={'span'}
          className={'dropdown-container'}
        >
          <Image src={icon} width={20} height={20} />
        </DropdownToggle>
        <DropdownMenu right>
          <div className={'card-container'}>

          </div>
          {/* {menuData &&
            menuData.length > 0 &&
            menuData.map((el: any, index: number) => {
              const { icon, name } = el;
              return (
                <>
                  <DropdownItem
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
            })} */}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
}

export { MenuBar };
