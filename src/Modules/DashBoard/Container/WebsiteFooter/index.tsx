import { icons } from "@Assets";
import { Divider, Image } from "@Components";
import { useNavigation } from "@Hooks";
import { ROUTES } from "@Routes";
import { Link } from "react-router-dom";
import "./index.css";
import {
  CardFooter,
  Container,
  NavbarBrand,
} from "reactstrap";

function WebsiteFooter() {
  return (
    <>
      <footer className="pb-3 pt-3 mt-7 bg-container-dark" id="footer-main">
        <section>
          <div>
            <div className="container mb-md--3">
              <div className="row">
                <div className="col-lg-4 d-flex justify-content-start">
                  <div className="">
                    <div className="mr-3 ">
                      <NavbarBrand to="/" tag={Link}>
                        <Image className={'mb-2'} src={icons.logoText} height={20} />
                      </NavbarBrand>
                      <p
                        className="text-secondary mt-4 mb-3 d-flex justify-content-start"
                        style={{ fontSize: "15px", fontWeight: 400 }}
                      >
                        intrvu SPACE is your dedicated companion in the pursuit
                        of interview success. Prepare effectively, outshine the
                        competition, and unlock the job you deserve!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col d-flex justify-content-start mt-lg-0 mt-5 ml-md-5 ">
                  <div className="">
                    <h3 className="text-secondary font-weight-800">COMPANY</h3>
                    <p
                      className="mt-4 text-secondary"
                      style={{ fontSize: "15px", fontWeight: 400 }}
                    >
                      <div className="">
                        <a className="link-text" href="#home">
                          Home
                        </a>
                      </div>
                      <div className="">
                        <a
                          className="link-text"
                          href="#Automated Interviews"
                        >
                          Pricing
                        </a>
                      </div>
                      <div>
                        <span>Contact Us</span>
                      </div>
                    </p>
                  </div>
                </div>
                <div className="col d-flex justify-content-start mt-lg-0 mt-5">
                  <div className="">
                    <h3 className="font-weight-800 text-secondary">LEGAL</h3>
                    <p
                      className="text-secondary"
                      style={{ fontSize: "15px", fontWeight: 400 }}
                    >
                      <div className="mt-4">
                        <a
                          className="text-secondary text-decoration-underline-hover"
                          // onClick={() => goTo(ROUTES["auth-module"].privacy)}
                        >
                          Privacy Policy
                        </a>
                      </div>
                      <div >
                        <a
                          className="text-secondary text-decoration-underline-hover"
                          onClick={
                            () => {}
                            // goTo(ROUTES["auth-module"].TermsAndConditions)
                          }
                        >
                          Terms of Service
                        </a>
                      </div>
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 d-flex justify-content-start mt-lg-0 mt-5">
                  <div className="">
                    <h3 className="text-secondary font-weight-800">
                      CONTACT US
                    </h3>
                    <div
                      className="text-secondary"
                      style={{ fontSize: "15px", fontWeight: 400 }}
                    >
                      <div className="mt-4 d-flex align-items-center">
                        <Image src={icons.email} height={16} />
                        <span className="ml-2">contact@leorainfotech.in</span>
                      </div>
                      <div className="mt-1">
                        <Image src={icons.phoneCall} height={16} />
                        <span className="ml-2">+91 9445092211</span>
                      </div>
                      <div className="mt-1">
                        <Image src={icons.mark} height={18} />

                        <span className="ml-2">
                          No:03, Prithiv Nagar, G.N.T Road,
                          <br />{" "}
                          {/* <span className="ml-4" style={{ fontSize: '15px', fontWeight: 400 }}> Road</span>
                        <br />{" "} */}
                          <span className="ml-4"> Gummidipoondi - 601 201</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="mx-lg-6 mx-md-4 mx-3"></hr>

        <Container>
          <div
            className={`mt--2 ml-0 d-flex flex-sm-row flex-column  align-items-center`}
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
              <span className="text-secondary">Powered by</span>{" "}
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
