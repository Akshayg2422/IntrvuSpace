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

  return (
    <>

      {/* <section
        style={{ backgroundColor: "#F4F5FF" }}
      >
        <div>
          <div className="container">
            <div className="row mt-7">
              <div className="col-lg-4 d-flex justify-content-start mt--2">
                <div className="">
                  <div className="mr-3 ">
                    <NavbarBrand to="/" tag={Link}>
                      <Image src={icons.logoText} height={20} />
                    </NavbarBrand>
                    <span className="text-secondary mt-4 mb-3 d-flex justify-content-start text-justify" style={{ fontSize: '15px', fontWeight: 400 }}>
                      intrvu SPACE is your dedicated companion in the pursuit of
                      interview success. Prepare effectively, outshine the
                      competition, and unlock the job you deserve!
                    </span>
                  </div>
                </div>
              </div>
              <div className="col d-flex justify-content-start mt-lg-0 mt-5 ml-md-5 ">
                <div className="">
                  <h3 className="text-secondary font-weight-800">COMPANY</h3>
                  <div className="mt-4 text-secondary" style={{ fontSize: '15px', fontWeight: 400 }}>
                    <div className=""  >
                      <a className="text-secondary" href="#home">
                        <span className="pointer" > Home</span>
                      </a>
                    </div>
                    <div className="mt-1 " >
                      <a className="text-secondary pointer" href="#Automated Interviews">Pricing</a>
                    </div>
                    <div className="mt-1">
                      <span>Contact Us</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col d-flex justify-content-start mt-lg-0 mt-5">
                <div className="">
                  <h3 className="font-weight-800 text-secondary">LEGAL</h3>
                  <div className="text-secondary">
                    <div className="mt-4">
                      <a
                        className="text-secondary text-decoration-underline-hover" style={{ fontSize: '15px', fontWeight: 400 }}
                      onClick={() => goTo(ROUTES["auth-module"].privacy)}
                      >
                        Privacy Policy
                      </a>
                    </div>
                    <div className="mt-1">
                      <a
                        className="text-secondary text-decoration-underline-hover" style={{ fontSize: '15px', fontWeight: 400 }}
                        onClick={
                          () => { }
                          goTo(ROUTES["auth-module"].TermsAndConditions)
                        }
                      >
                        Terms of Service
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 d-flex justify-content-start mt-lg-0 mt-5" >
                <div className="">
                  <h3 className="text-seconary font-weight-800">CONTACT US</h3>
                  <div className="text-secondary">
                    <div className="mt-4 d-flex align-items-center">
                      <Image src={icons.email} height={16} />
                      <span className="ml-2" style={{ fontSize: '15px', fontWeight: 400 }}>contact@leorainfotech.in</span>
                    </div>
                    <div className="mt-1">
                      <Image src={icons.phoneCall} height={16} />
                      <span className="ml-2" style={{ fontSize: '15px', fontWeight: 400 }}>+91 9445092211</span>
                    </div>
                    <div className="mt-1">
                      <Image src={icons.mark} height={16} />

                      <span className="ml-2" style={{ fontSize: '15px', fontWeight: 400 }}>
                        No:03, Prithiv Nagar, G.N.T Road,
                        <br />{" "}
                        <span className="ml-4" style={{ fontSize: '15px', fontWeight: 400 }}> Gummidipoondi - 601 201</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

    </>
  );
}

export { WebsiteContactUs };
