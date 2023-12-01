import { icons } from "@Assets";
import { CommonTable, DropDown, Input, MenuBar, NoDataFound, ScreenHeading, Spinner, showToast } from "@Components";
import { useDropDown, useInput, useKeyPress, useLoader, useNavigation } from "@Hooks";
import { deleteInterview, getRecentInterviews, resetInterview, getCompanies } from "@Redux";
import { ROUTES } from "@Routes";
import { DEFAULT_VALUE, INITIAL_PAGE, getDropDownCompanyDisplayData, paginationHandler } from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const RecentInterviews = () => {

  const STATUS_LIST = [
    { id: 'ALL', text: 'All' },
    { id: 'IS_STARTED', text: 'Yet to start' },
    { id: 'IS_COMPLETED', text: 'Completed' },
  ]

  const SCHEDULE_MENU = [
    { id: 1, name: "View Interview Info" },
    { id: 2, name: "Reset Interview" },
    { id: 3, name: "Delete Interview" },
  ];

  const dispatch = useDispatch();
  const loader = useLoader(false)
  const filterCompanies = useDropDown(DEFAULT_VALUE);
  const status = useDropDown(STATUS_LIST[0]);
  const search = useInput("");
  const enterPress = useKeyPress("Enter");
  const { goTo } = useNavigation();

  const {
    recentInterviews,
    recentInterviewsNumOfPages,
    recentInterviewsCurrentPages,
    companies
  } = useSelector((state: any) => state.SuperAdminReducer);

  useEffect(() => {
    getRecentInterviewsHandler(INITIAL_PAGE);
  }, [filterCompanies.value.id, status.value?.id]);

  useEffect(() => {
    if (enterPress) {
      getRecentInterviewsHandler(INITIAL_PAGE);
    }
  }, [enterPress]);



  useEffect(() => {
    getCompaniesApiHandler();
  }, [])


  const getCompaniesApiHandler = () => {
    const params = {};
    loader.show();

    dispatch(
      getCompanies({
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


  const getRecentInterviewsHandler = (page_number: number) => {

    const companyId = filterCompanies.value.id;

    const filterStatus = {
      ...(status.value?.id === "IS_STARTED" && { is_started: true }),
      ...(status.value?.id === "IS_COMPLETED" && { is_complete: true })
    };

    const params = {
      page_number,
      ...(search?.value && { q: search?.value }),
      ...(companyId !== "-1" && { company_id: companyId }),
      ...filterStatus
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

  function proceedMenuClickHandler(selected: any, id: any) {
    if (selected?.id === SCHEDULE_MENU[0].id) {
      proceedResponse(id);
    } else if (selected?.id === SCHEDULE_MENU[1].id) {
      resetInterviewApiHandler(id);
    } else if (selected?.id === SCHEDULE_MENU[2].id) {
      deleteInterviewApiHandler(id);
    }
  }

  function proceedResponse(id: string) {
    if (id) {
      goTo(ROUTES["designation-module"].response + "/" + id);
    }
  }

  function resetInterviewApiHandler(sid: string) {

    const params = { sid };

    dispatch(
      resetInterview({
        params,
        onSuccess: (response: any) => () => {
          const { message } = response
          getRecentInterviewsHandler(recentInterviewsCurrentPages)
          showToast(message, 'success')
        },
        onError: () => () => { },
      })
    );
  }

  function deleteInterviewApiHandler(sid: string) {

    const params = { sid };

    dispatch(
      deleteInterview({
        params,
        onSuccess: (response: any) => () => {
          const { message } = response
          getRecentInterviewsHandler(recentInterviewsCurrentPages)
          showToast(message, 'success')
        },
        onError: () => () => { },
      })
    );
  }

  const normalizedTableData = (data: any) => {
    if (data && data.length > 0)
      return data.map((each: any) => {


        const { id, interviewee_name, interviewee_role, interviewee_email, interviewee_experience, interview_duration, company_details } = each;
        const name = company_details?.name

        return {
          name,
          'interviewee name': interviewee_name,
          role: interviewee_role,
          email: interviewee_email,
          experience: interviewee_experience,
          duration: interview_duration,
          '': <div className={""}>
            <MenuBar
              menuData={SCHEDULE_MENU}
              onClick={(action) =>
                proceedMenuClickHandler(
                  action,
                  id
                )
              }
              icon={icons.more}
            />
          </div>
        };

      });
  };

  return (
    <div className={'screen-padding'}>
        <ScreenHeading text={'Recent Interviews'} />

      <div className={'row'}>
        <div className="col-sm-3">
          <Input
            id={'search'}
            heading={"Search"}
            type={"text"}
            placeHolder={"Name, Email..."}
            value={search?.value}
            onChange={search.onChange}
          />
        </div>

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
      </div>
      {
        loader.loader &&
        <div className={'loader-container'}>
          <Spinner />
        </div>
      }

      {
        recentInterviews && recentInterviews.length > 0 &&
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
      }

      {!loader.loader && recentInterviews?.length <= 0 && (
        <div className={"no-data-found"}>
          <NoDataFound />
        </div>
      )}
    </div>
  );
};

export { RecentInterviews };
