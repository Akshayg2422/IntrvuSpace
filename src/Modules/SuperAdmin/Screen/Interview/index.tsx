import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecentInterviews } from "@Redux";
import { CommonTable } from "@Components";
import { INITIAL_PAGE, paginationHandler } from "@Utils";

export const Interview = () => {
  const dispatch = useDispatch();
  const {
    recentInterviews,
    recentInterviewsNumOfPages,
    recentInterviewsCurrentPages,
  } = useSelector((state: any) => state.SuperAdminReducer);

  useEffect(() => {
    getRecentInterviewsHandler(INITIAL_PAGE);
  }, []);

  console.log(
    "recentInterviews=============",
    JSON.stringify(recentInterviews)
  );

  const getRecentInterviewsHandler = (page_number: number) => {
    const params = {
      page_number
    };
    dispatch(
      getRecentInterviews({
        params,
        onSuccess: (response) => () => {
          console.log(JSON.stringify(response), "fhdvkbabvhk");
        },
        onError: () => () => {},
      })
    );
  };

  const normalizedTableData = (data: any) => {
    if (data && data.length > 0)
      return data.map((each: any) => {
        console.log("each---->", each);

        const { interviewee_name, interviewee_role, interviewee_email } = each;

        return {
          name: interviewee_name,
          role: interviewee_role,
          email: interviewee_email,
        };
      });
  };

  return (
    <div>
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
  );
};
