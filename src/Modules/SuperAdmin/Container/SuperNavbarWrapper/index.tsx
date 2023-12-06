import React from 'react'
import { SuperAdminNavbar } from '@Modules'
import { useSideNav } from '@Hooks'

function SuperAdminNavbarWrapper() {
  const { sideNavOpen, toggleSideNav } = useSideNav();
  return (
    <SuperAdminNavbar
      sidenavOpen={sideNavOpen}
      toggleSidenav={toggleSideNav}
    />
  )

}

export { SuperAdminNavbarWrapper }