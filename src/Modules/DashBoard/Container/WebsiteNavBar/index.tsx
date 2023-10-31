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
      className="navbar-horizontal navbar-main navbar-dark fixed-top"
      expand="lg"
      id="navbar-main"
      style={{ backgroundColor: "#fafbff" }}
    >
      <Container>
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
              className="pointer text-bold mr-lg--3"
              style={{
                borderColor: "#d8dade",
                // borderWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
                fontSize: 14,
                paddingRight: 15,
                paddingLeft: 15,
                borderRadius: 4
              }}
              onClick={() => {
                goTo(ROUTES["auth-module"].login);
              }}
              text={"Log in"}
              size="sm"
              outline
              isTextLowercase
            />
          </Nav>
        </UncontrolledCollapse>
      </Container>
    </Navbar>
  );
}

export { WebsiteNavBar };
