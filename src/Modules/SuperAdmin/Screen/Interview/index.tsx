import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecentInterviews } from "@Redux";
import { CommonTable, DropDown, NoDataFound, Spinner, showToast } from "@Components";
import { DEFAULT_VALUE, INITIAL_PAGE, getDropDownCompanyDisplayData, paginationHandler } from "@Utils";
import { useDropDown, useLoader } from "@Hooks";

const Interview = () => {

  const dispatch = useDispatch();
  const loader = useLoader(false)
  const filterCompanies = useDropDown(DEFAULT_VALUE);

  const {
    recentInterviews,
    recentInterviewsNumOfPages,
    recentInterviewsCurrentPages,
    companies
  } = useSelector((state: any) => state.SuperAdminReducer);

  useEffect(() => {
    getRecentInterviewsHandler(INITIAL_PAGE);
  }, [filterCompanies.value?.id]);

  const getRecentInterviewsHandler = (page_number: number) => {

    const companyId = filterCompanies.value.id;

    const params = {
      page_number,
      ...(companyId !== "-1" && {
        company_id: companyId
      }),
    };
    console.log('params----------', params);

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
      {
        loader.loader &&
        <div className={'loader-container'}>
          <Spinner />
        </div>
      }

      <div className="col-sm-3 m-0 p-0">
        {companies && companies.length > 0 && (
          <DropDown
            id={"companies"}
            heading={"Companies"}
            data={[DEFAULT_VALUE, ...getDropDownCompanyDisplayData(companies, 'display_name')]}
            selected={filterCompanies.value}
            onChange={filterCompanies.onChange}
          />
        )}
      </div>

      {recentInterviews && recentInterviews.length > 0 &&
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
      }

      {
        !loader.loader && recentInterviews?.length <= 0 && 
        <div className={"no-data-found"}>
          <NoDataFound />
        </div>
      }
    </div>
  );
};

export { Interview }