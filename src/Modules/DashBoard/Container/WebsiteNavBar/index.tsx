import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  NavbarBrand,
  UncontrolledCollapse,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import "./index.css";
import { icons } from "@Assets";
import { Image, Button } from "@Components";
import { ROUTES } from "@Routes";
import { useDynamicHeight, useNavigation } from "@Hooks";

function WebsiteNavBar() {
  const { goTo } = useNavigation();

  let dynamicHeight: any = useDynamicHeight();

  const dynamicPaddingTop = dynamicHeight.dynamicWidth <= 576 ? "pt-2" : "";

  return (
    <Navbar
      className="navbar-horizontal navbar-main navbar-dark fixed-top pl-lg-5 pr-lg-5 py--3 shadow"
      expand="lg"
      id="navbar-main"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* <Container> */}
      <NavbarBrand to="/" tag={Link}>
        <img className={"ml-lg--1"} alt="..." src={icons.logoIcon} />

        <img className={"ml-2"} alt="..." src={icons.logoText} />
      </NavbarBrand>
      <button
        aria-controls="navbar-collapse"
        aria-expanded={false}
        aria-label="Toggle navigation"
        className="navbar-toggler"
        data-target="#navbar-collapse"
        data-toggle="collapse"
        id="navbar-collapse"
        type="button"
      >
        <div className={"pt-2"}>
          <Image height={30} width={30} src={icons.navbarToggler} />
        </div>
      </button>
      <UncontrolledCollapse
        className="navbar-custom-collapse"
        navbar
        toggler="#navbar-collapse"
      >
        <Nav className="ml-auto" navbar>
          <NavLink to="/admin/dashboard" tag={Link}>
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
          </NavLink>
          <Button
            className="pointer text-bold mr-lg--1 my-1 text-primary"
            style={{ borderRadius: 4, borderWidth: 2, fontSize:16, paddingRight:14, paddingLeft:14 }}
            onClick={() => {
              goTo(ROUTES["auth-module"].login);
            }}
            text={"Log in"}
            size="sm"
            outline
            isTextUppercase
          />
        </Nav>
      </UncontrolledCollapse>
      {/* </Container> */}
    </Navbar>
  );
}

export { WebsiteNavBar };
