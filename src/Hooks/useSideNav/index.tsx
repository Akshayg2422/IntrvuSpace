import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSideNav } from '@Redux'

function useSideNav() {

    const dispatch = useDispatch()

    const { sideNavOpen } = useSelector((state: any) => state.AppReducer);

    const toggleSideNav = () => {
        if (document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.remove("g-sidenav-pinned");
            document.body.classList.add("g-sidenav-hidden");
        } else {
            document.body.classList.add("g-sidenav-pinned");
            document.body.classList.remove("g-sidenav-hidden");
        }

        dispatch(setSideNav())
    };



    return {
        sideNavOpen,
        toggleSideNav
    }
}

export { useSideNav }