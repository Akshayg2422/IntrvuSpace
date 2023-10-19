// import { Col, Container, Row } from "reactstrap";
// // import "./style.scss";
// import { videos, image } from "@Assets";
// import { Image, Button } from "@Components";
// import { useNavigation } from "@Hooks";
// import { ROUTES } from "@Routes";

// function WebsiteHeader() {
//   const { goTo } = useNavigation();
//   return (
//     <>
//       <div className="header pt-5" style={{ backgroundColor: "#ffffff" }}>
//         {/* <video
//             autoPlay
//             loop
//             muted
//             style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover',
//                 zIndex: -1,
//                 borderRadius: 6,
//                 marginBottom: -10
//                 // opacity: 0.3, // Set the desired opacity value
//                 // marginBottom: -10
//             }}
//         >
//             <source src={videos.backgroundLanding} type="video/mp4" />
//         </video> */}
//         <Container>
//           <div className="header-body">
//             <Row className="align-items-center h-100vh">
//               <Col lg="6">
//                 <div className="mt--3">
//                   <h2
//                     className="display-1 custom-black font-weight-bolder mb-0"
//                     style={{ fontSize: "60px" }}
//                   >
//                     Intrvu SPACE
//                   </h2>
//                 </div>
//               </Col>
//               <Col lg="6" className="pl-sm-5">
//                 <iframe
//                   width="560"
//                   height="315"
//                   src="https://www.youtube.com/embed/4ENWOevsXPk?si=7CztlsKRPdpDoy1k"
//                   title="YouTube video player"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                 ></iframe>
//                 <div className="mt-2">
//                   <Button text={"Start Now"} size="lg" outline />
//                 </div>
//               </Col>
//             </Row>
//           </div>
//         </Container>
//       </div>
//     </>
//   );
// }

// export { WebsiteHeader };

import { useDynamicHeight, useGrowingTitleLine } from "@Hooks";
import { Col, Container, Row } from "reactstrap";

function WebsiteHeader() {
  let dynamicHeight: any = useDynamicHeight();

  const { growingWidth, titleLineRef: websiteHeaderRef } =
    useGrowingTitleLine();

  let dynamicWidthCalculation =
    dynamicHeight.dynamicWidth <= 510
      ? dynamicHeight.dynamicWidth / 1.3
      : dynamicHeight.dynamicHeight - 44;

  const screenHeight = dynamicHeight.dynamicWidth <= 576 ? "" : "h-100vh";

  return (
    <div
      className="header pt-5"
      ref={websiteHeaderRef}
      style={{ backgroundColor: "#ffffff" }}
    >
      <Container>
        <div className="header-body">
          <Row className={screenHeight}>
            <Col lg="6">
              <div className="mt-sm-5">
                <span
                  className="text-primary mb-0 ls-2"
                  style={{ fontSize: "96px", fontWeight: "300" }}
                >
                  {"intrvu"}
                </span>

                <span
                  className="display-1 text-primary font-weight-bolder mb-0 ls-1"
                  style={{ fontSize: "70px" }}
                >
                  {" SPACE"}
                </span>
              </div>
              <div
                className="mt-1"
                style={{
                  height: 5,
                  width: growingWidth,
                  backgroundColor: "black",
                }}
              />
              <div className="mt-6">
                <span className="custom-black">
                  {"Step into the Future of Interviews with intrvu SPACE."}
                </span>
              </div>

              {/* <div className="mt-sm-2 align-items-center">
                <Image src={icons.coverPic} height={250} width={500} />
              </div> */}
            </Col>
            <Col lg="6" sm="12" className={`align-self-center pl-lg-2 ${!screenHeight ? "mt-5" : "" }`}>
              <div className="video-container">
                <iframe
                  width={dynamicWidthCalculation + (!screenHeight ? 45 : 0)}
                  height={(dynamicWidthCalculation * 9) / 16 + 60}
                  src="https://www.youtube.com/embed/4ENWOevsXPk?si=7CztlsKRPdpDoy1k"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export { WebsiteHeader };
