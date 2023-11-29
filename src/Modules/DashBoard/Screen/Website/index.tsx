import {
  AllInOnePlatform,
  WebsiteAutoApprovalForCandidatesPerformance,
  WebsiteCandidateAttendsInterview,
  WebsiteContactUs,
  WebsiteCreateJdAndAddCandidates,
  WebsiteFooter,
  WebsiteHeader,
  WebsiteNavBar,
  WebsiteReportsAndInsights,
  WebsiteScheduleAndNotification
} from "@Modules";

function Website() {
  return (
    <div className={'bg-container-light'}>
      <div className="main-content" >
        <WebsiteNavBar />
        <WebsiteHeader />
        <AllInOnePlatform />
        <WebsiteCreateJdAndAddCandidates />
        <WebsiteScheduleAndNotification />
        <WebsiteCandidateAttendsInterview />
        <WebsiteReportsAndInsights />
        <WebsiteAutoApprovalForCandidatesPerformance />

        {/* <EffortlessInterviews /> */}

        {/* <InsightsAndReports />
        <AutoApprovalSystem /> */}
        {/* <HowItWorks />
        <Reports />
        <Data /> */}
        {/* <From /> */}
        {/* <AuthenticationAndDashboardModule />
        <Pricing /> */}
        <WebsiteFooter />
      </div>
    </div>
  );
}

export { Website };

// import React, { useEffect, useRef } from "react";
// import { WebsiteHeader, EffortlessInterviews } from "@Modules";

// function Website() {
//   const effortlessRef = useRef<HTMLDivElement | null>(null); // Define the type for the ref
//   const transitionThreshold = 50; // Adjust this value as needed

//   useEffect(() => {
//     const handleScroll = () => {
//       const headerHeight =
//         document.getElementById("website-header")?.clientHeight;
//       console.log("headerHeight", headerHeight);
//       const scrollY = window.scrollY;
//       console.log("scrolly===>", scrollY);
//       if (
//         headerHeight !== undefined &&
//         scrollY >= headerHeight + transitionThreshold
//       ) {
//         console.log("1111111111111")
//         if (effortlessRef.current) {
//           effortlessRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div>
//       <div id="website-header">
//         <WebsiteHeader />
//       </div>
//       <div ref={effortlessRef}>
//         <EffortlessInterviews />
//       </div>
//     </div>
//   );
// }

// export { Website };
