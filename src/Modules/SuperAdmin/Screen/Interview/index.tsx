import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecentInterviews } from "@Redux";
import { CommonTable, DropDown, NoDataFound, Spinner, showToast } from "@Components";
import { DEFAULT_VALUE, INITIAL_PAGE, getDropDownCompanyDisplayData, paginationHandler } from "@Utils";
import { useDropDown, useLoader } from "@Hooks";

const Interview = () => {

  const STATUS_LIST = [
    { id: 'ALL', text: 'All' },
    { id: 'IS_STARTED', text: 'Yet to start' },
    { id: 'IS_COMPLETED', text: 'Completed' },
  ]
  const dispatch = useDispatch();
  const loader = useLoader(false)
  const filterCompanies = useDropDown(DEFAULT_VALUE);
  const status = useDropDown(STATUS_LIST[0]);
  const {
    recentInterviews,
    recentInterviewsNumOfPages,
    recentInterviewsCurrentPages,
    companies
  } = useSelector((state: any) => state.SuperAdminReducer);

  useEffect(() => {
    getRecentInterviewsHandler(INITIAL_PAGE);
  }, [filterCompanies.value?.id, status?.value]);

  const getRecentInterviewsHandler = (page_number: number) => {

    const companyId = filterCompanies.value.id;

    const filterStatus =
      status.value?.id === "IS_STARTED"
        ? { is_started: true }
        : status.value?.id === "IS_COMPLETED"
          ? { is_complete: true }
          : {};

    const params = {
      page_number,
      ...(companyId !== "-1" && { company_id: companyId }),
      ...(filterStatus && filterStatus),
    };
    loader.show();

    dispatch(
      getRecentInterviews({
        params,
        onSuccess: () => () => {
          loader.hide();
        },
        onError: () => () => {
          loader.hide();
        },
      })
    );
  };

  const normalizedTableData = (data: any) => {
    if (data && data.length > 0)
      return data.map((each: any) => {

        const { interviewee_name, interviewee_role, interviewee_email, interviewee_experience, interview_duration, company_details } = each;
        const name = company_details?.name

        return {
          name,
          'interviewee name': interviewee_name,
          role: interviewee_role,
          email: interviewee_email,
          experience: interviewee_experience,
          duration: interview_duration
        };

      });
  };

  return (
    <div className={'screen-padding'}>
      {loader.loader && (
        <div className={'loader-container'}>
          <Spinner />
        </div>
      )}

      {!loader.loader && (
        <div className={'row'}>
          {companies && companies.length > 0 && (
            <>
              <div className={'col-sm-3'}>
                <DropDown
                  id={"companies"}
                  heading={"Companies"}
                  data={[DEFAULT_VALUE, ...getDropDownCompanyDisplayData(companies, 'display_name')]}
                  selected={filterCompanies.value}
                  onChange={filterCompanies.onChange}
                />
              </div>

              <div className={'col-sm-3'}>
                <DropDown
                  id={"Status"}
                  heading={"Status"}
                  data={STATUS_LIST}
                  selected={status.value}
                  onChange={status.onChange}
                />
              </div>
            </>
          )}
        </div>
      )}

      {recentInterviews && recentInterviews.length > 0 && (
        <div className={'overflow-auto'}>
          <CommonTable
            isPagination
            tableDataSet={recentInterviews}
            displayDataSet={normalizedTableData(recentInterviews)}
            noOfPage={recentInterviewsNumOfPages}
            currentPage={recentInterviewsCurrentPages}
            paginationNumberClick={(currentPage) => {
              getRecentInterviewsHandler(paginationHandler("current", currentPage));
            }}
            previousClick={() => {
              getRecentInterviewsHandler(
                paginationHandler("prev", recentInterviewsCurrentPages)
              );
            }}
            nextClick={() => {
              getRecentInterviewsHandler(
                paginationHandler("next", recentInterviewsCurrentPages)
              );
            }}
          />
        </div>
      )}

      {!loader.loader && recentInterviews?.length <= 0 && (
        <div className={"no-data-found"}>
          <NoDataFound />
        </div>
      )}
    </div>
  );
};

export { Interview }