import { icons } from "@Assets";
import { Image } from "@Components";
import { useNavigation } from "@Hooks";
import { ROUTES } from "@Routes";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
} from "reactstrap";

function WebsiteFooter() {
  const { goTo } = useNavigation();
  return (
    <>
      <footer
        className="pb-3"
        id="footer-main"
        style={{ backgroundColor: "#fafbff" }}
      >
        <hr className="mx-lg-6 mx-md-4 mx-3"></hr>
        <Container>
          <div
            className={`mt--2 ml-0 d-flex flex-sm-row flex-column justify-content-between`}
          >
            <div className={"col col-sm-6 text-secondary ml--3"}>
              Copyright © {new Date().getFullYear()} www.intrvu.space | All
              Rights Reserved.
            </div>
            <div
              className={
                "col col-sm-6 text-sm-right text-secondary ml-sm--0 ml--3 mr-0 mr-sm--3 mt-sm-0 mt-2"
              }
            >
              <span className="">Powered by</span>{" "}
              <a
                target="_blank"
                className="text-primary pointer font-weight-600 text-decoration-underline-hover"
                href="https://www.leorainfotech.in/"
              >
                Leora Infotech
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}

export { WebsiteFooter };
