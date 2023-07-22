export interface SidebarProps {
    toggleSideNav?: () => void;
    sideNavOpen?: boolean;
    routes?: any;
    logo?: LogoItem;
    rtlActive?: boolean;
}

export interface LogoItem {
    innerLink?: string;
    imgSrc?: string;
    imgAlt?: string;
    outterLink?: string;
}