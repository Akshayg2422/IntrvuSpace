
import React from "react";
import { useLocation, NavLink as NavLinkRRD, Link } from "react-router-dom";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";


import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";
import { SidebarProps } from './interfaces'
import { Image } from '@Components'
import { url } from "inspector";
import { useDispatch, useSelector } from "react-redux";
import { getPhoto } from "@Utils";
import { icons } from "@Assets";
import { settingSideNavRemove } from "@Redux";
function Sidebar({ toggleSideNav, sideNavOpen, routes, logo, rtlActive }: SidebarProps) {
  // const { dashboardDetails } = useSelector((state: any) => state.UserCompanyReducer);
  // const { user_details, } = dashboardDetails || ''
  const [state, setState] = React.useState({});
  const dispatch = useDispatch()
  const location = useLocation();
  const { removeSideNav } = useSelector((state: any) => state.DashboardReducer)

  React.useEffect(() => {
    setState(getCollapseStates(routes));
    // eslint-disable-next-line
  }, []);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // makes the sidenav normal on hover (actually when mouse enters on it)
  const onMouseEnterSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  };
  // makes the sidenav mini on hover (actually when mouse leaves from it)
  const onMouseLeaveSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  };
  // this creates the intial state of this component based on the collapse routes
  // that it gets through routes
  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (location.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };
  // this is used on mobile devices, when a user navigates
  // the sidebar will autoclose
  const closeSidenav = () => {
    if (window.innerWidth < 1200) {
      if (toggleSideNav)
        toggleSideNav();
    }
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <NavItem key={key}>
            <NavLink
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={state[prop.state]}
              className={classnames({
                active: getCollapseInitialState(prop.views),
              })}
              onClick={(e) => {
                e.preventDefault();
                setState(st);
              }}
            >
              {prop.icon ? (
                <>
                  <Image className="image-Color" src={prop?.icon} width={18} height={18} />
                  <span className="nav-link-text ml-3">{prop.name}</span>
                </>
              ) : prop.miniName ? (
                <>
                  <span className="sidenav-mini-icon"> {prop.miniName} </span>
                  <span className="sidenav-normal"> {prop.name} </span>
                </>
              ) : null}
            </NavLink>
            <Collapse isOpen={state[prop.state]}>
              <Nav className="nav-sm flex-column">
                {createLinks(prop.views)}
              </Nav>
            </Collapse>
          </NavItem>
        );
      }
      return (
        <NavItem className={activeRoute(prop.layout + prop.path)} key={key}>
          <NavLink
            to={prop.layout + prop.path}
            activeClassName=""
            onClick={() => {
              closeSidenav()
              if (prop.name === 'View as Member') {
                dispatch(settingSideNavRemove(true))
              }
            }}
            tag={NavLinkRRD}
          >
            {prop.icon !== undefined ? (
              <>
                <Image className="image-Color" src={prop?.icon} width={18} height={18} />
                <span className="nav-link-text ml-3">{prop.name}</span>
              </>
            ) : prop.miniName !== undefined ? (
              <>
                <span className="sidenav-mini-icon"> {prop.miniName} </span>
                <span className="sidenav-normal"> {prop.name} </span>
              </>
            ) : (
              prop.name
            )}
          </NavLink>
        </NavItem>
      );
    });
  };

  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }
  const scrollBarInner = (
    <div className="scrollbar-inner">
      <div className="sidenav-header d-flex align-items-center">
        {logo ? (
          <NavbarBrand {...navbarBrandProps}>
            <div className="row">
              <Image
                alt={logo.imgAlt}
                className="navbar-brand-img rounded-circle "
                src={icons.logoIcon}
                height={33}
                width={33}


              />
              {/* <div className="ml-2 text-sm mt-2">{user_details?.name}</div> */}

            </div>
          </NavbarBrand>
        ) : null}
        <div className="ml-auto">
          <div
            className={classnames("sidenav-toggler d-none d-xl-block", {
              active: sideNavOpen,
            })}
            onClick={toggleSideNav}
          >
            <div className="sidenav-toggler-inner">
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-inner">
        <Collapse navbar isOpen={true}>
          <Nav navbar>{createLinks(routes)}</Nav>
        </Collapse>
      </div>

      {/* <div className="sidenav-header d-flex align-items-center ">
        {logo && (
          <NavbarBrand {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img fixed-bottom ml-3 mb-4"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        )}
      </div> */}


    </div>
  );
  return (
    <Navbar
      className={
        "sidenav navbar-vertical navbar-expand-xs navbar-light " +
        (rtlActive ? "" : "fixed-left")
      }
      style={{ backgroundColor: '#f5f5f5' }}
      onMouseEnter={onMouseEnterSidenav}
      onMouseLeave={onMouseLeaveSidenav}
    >
      {navigator.platform.indexOf("Win") > -1 ? (
        <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar>
      ) : (
        scrollBarInner
      )}
    </Navbar>
  );
}




export { Sidebar };
