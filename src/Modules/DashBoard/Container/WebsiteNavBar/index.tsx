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
      className="navbar-horizontal navbar-main navbar-dark fixed-top shadow"
      expand="lg"
      id="navbar-main"
      style={{ backgroundColor: "#ffffff" }}
    >
      <Container>
        <NavbarBrand to="/" tag={Link}>
          <div className={"ml--5"}>
            <img alt="..." src={icons.logoText} style={{ height: 55 }} />
          </div>
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
              className="pointer text-bold mr-lg--3 text-primary py-2"
              style={{
                borderRadius: 4,
                borderColor: "#d8dade",
                borderWidth: 1,
                fontSize: 14,
                paddingRight: 10,
                paddingLeft: 10,
                letterSpacing:0
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
