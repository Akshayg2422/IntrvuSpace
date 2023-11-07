import classnames from "classnames";
import {
  Card,
  Row,
  Col,
  Form,
  CardBody,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormGroup,
  NavbarBrand,
  NavLink,
  NavItem,
  Nav,
} from "reactstrap";
import "./index.css";
import { icons } from "@Assets";
import { Link } from "react-router-dom";
import { useDynamicHeight, useNavigation } from "@Hooks";
import { ROUTES } from "@Routes";
import { Button, Image } from "@Components";

function WebsiteContactUs() {
  const { goTo } = useNavigation();
  let dynamicHeight: any = useDynamicHeight();

  const dynamicMarginTop = dynamicHeight.dynamicWidth <= 576 ? "mt-4" : "";

  return (
    <>
      <section
        className={`${dynamicMarginTop ? "pt-5" : "pt-1"}`}
        style={{ backgroundColor: "#fafbff" }}
      >
        <div>
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-4 d-flex justify-content-start mt--2">
                <div className="">
                  <div className="mr-3 ">
                    <NavbarBrand to="/" tag={Link}>
                      <Image src={icons.logoText} height={26} />
                    </NavbarBrand>
                    <span className="text-secondary mt-4 mb-3 d-flex justify-content-start text-justify">
                      intrvu SPACE is your dedicated companion in the pursuit of
                      interview success. Prepare effectively, outshine the
                      competition, and unlock the job you deserve!
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4 d-flex justify-content-start mt-lg-0 mt-5 ">
                <div className="">
                  <h3 className="text-secondary font-weight-800">COMPANY</h3>
                  <div className="mt-4 text-secondary">
                    <div className="">
                      <span className=""> Home</span>
                    </div>
                    <div className="mt-2">
                      <span className="mt-4">Pricing</span>
                    </div>
                    <div className="mt-2">
                      <span>Contact Us</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-4 d-flex justify-content-start mt-lg-0 mt-5">
                <div className="">
                  <h3 className="font-weight-800 text-secondary">LEGAL</h3>
                  <div className="text-secondary">
                    <div className="mt-4">
                      <a
                        className="text-secondary pointer text-decoration-underline-hover"
                        // onClick={() => goTo(ROUTES["auth-module"].privacy)}
                      >
                        Privacy Policy
                      </a>
                    </div>
                    <div className="mt-2">
                      <a
                        className="text-secondary pointer text-decoration-underline-hover"
                        onClick={
                          () => {}
                          // goTo(ROUTES["auth-module"].TermsAndConditions)
                        }
                      >
                        Terms of Service
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 d-flex justify-content-start mt-lg-0 mt-5">
                <div className="">
                  <h3 className="text-seconary font-weight-800">CONTACT US</h3>
                  <div className="text-secondary">
                    <div className="mt-4">
                      <span>contact@leorainfotech.in</span>
                    </div>
                    <div className="mt-2">
                      <span>+91 9445092211</span>
                    </div>
                    <div className="mt-2">
                      <span>
                        No:03, Prithiv Nagar, G.N.T Road, Gummidipoondi - 601
                        201
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export { WebsiteContactUs };
