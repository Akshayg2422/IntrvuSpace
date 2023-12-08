import { useSideNav } from '@Hooks';
import { SuperAdminNavbar } from '@Modules';
import { SuperNavbarWrapperProps } from './interfaces'

function SuperAdminNavbarWrapper({ actions }: SuperNavbarWrapperProps) {
  const { sideNavOpen, toggleSideNav } = useSideNav();

  return (
    <SuperAdminNavbar
      actions={actions}
      sidenavOpen={sideNavOpen ?? false}
      toggleSidenav={toggleSideNav}
    />
  )

}

export { SuperAdminNavbarWrapper };
