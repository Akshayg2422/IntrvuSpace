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
        <WebsiteFooter />
      </div>
    </div>
  );
}

export { Website };

