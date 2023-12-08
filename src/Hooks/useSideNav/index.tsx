
import { useApp } from '@Contexts';

function useSideNav() {

    const { sideNavOpen, setSideNavOpen } = useApp();

    const toggleSideNav = () => {
        if (document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.remove("g-sidenav-pinned");
            document.body.classList.add("g-sidenav-hidden");
        } else {
            document.body.classList.add("g-sidenav-pinned");
            document.body.classList.remove("g-sidenav-hidden");
        }

        if (setSideNavOpen) {
            setSideNavOpen(!sideNavOpen)
        }

    };



    return {
        sideNavOpen,
        toggleSideNav
    }
}

export { useSideNav };
