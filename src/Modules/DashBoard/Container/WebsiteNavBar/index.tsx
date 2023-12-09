import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  NavbarBrand,
  UncontrolledCollapse,
  Nav,
} from "reactstrap";
import "./index.css";
import { icons } from "@Assets";
import { Image, Button } from "@Components";
import { ROUTES } from "@Routes";
import { useNavigation } from "@Hooks";

function WebsiteNavBar() {
  const { goTo } = useNavigation();

  return (
    <Navbar
      className="navbar-horizontal navbar-main navbar-dark fixed-top bg-container-light"
      expand="lg"
      id="navbar-main"
    >
      <div className="container-fluid mx-md-3 mx-sm-0 mx-2">
        <NavbarBrand to="/" tag={Link}>
          <div className="d-flex justify-content-between">
            <img className={'d-none d-lg-block d-md-block d-xl-block'} src={icons.logoText} alt="Logo" style={{ height: '20%', width: '20%' }} />
            <img className={'d-block d-md-none d-lg-none d-xl-none'} src={icons.logoText} alt="Logo" style={{ height: '30%', width: '30%' }} />
            <button
              aria-controls="navbar-collapse"
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler mr--4"
              data-target="#navbar-collapse"
              data-toggle="collapse"
              id="navbar-collapse"
              type="button"
            >
              <Image height={30} width={30} src={icons.navbarToggler} />
            </button>
          </div>
        </NavbarBrand>
        <UncontrolledCollapse
          className="navbar-custom-collapse"
          navbar
          toggler="#navbar-collapse"
        >
          <div className="d-flex justify-content-end">
            <button
              aria-controls="navbar-collapse"
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler d-flex justify-content-end"
              data-target="#navbar-collapse"
              data-toggle="collapse"
              id="navbar-collapse"
              type="button"
            >
              <span />
              <span />
            </button>
          </div>
          <Nav className="ml-auto" navbar>
            {/* <NavLink to="/admin/dashboard" tag={Link}>
            <span className="text-primary tab-font-style">Home</span>
          </NavLink>
          <NavLink to="/auth/pricing" tag={Link}>
            <span className="text-primary tab-font-style">About</span>
          </NavLink>
          <NavLink to="/auth/login" tag={Link}>
            <span className="text-primary tab-font-style">Pricing</span>
          </NavLink>
          <NavLink tag={Link}>
            <span className="text-primary tab-font-style">Register</span>
          </NavLink> */}
            <Button
              outline
              onClick={() => {
                goTo(ROUTES["auth-module"].login);
              }}
              text={"Log in"}
            />
          </Nav>
        </UncontrolledCollapse>
      </div>
    </Navbar>
  );
}

export { WebsiteNavBar };
