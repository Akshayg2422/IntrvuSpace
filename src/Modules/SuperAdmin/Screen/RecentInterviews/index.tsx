import { icons } from "@Assets";
import { Button, CommonTable, DropDown, Input, MenuBar, NoDataFound, ScreenHeading, Spinner, showToast } from "@Components";
import { useDropDown, useInput, useKeyPress, useLoader, useNavigation } from "@Hooks";
import { deleteInterview, getCompanies, getRecentInterviews, resetInterview,fetchGenerateReport } from "@Redux";
import { ROUTES } from "@Routes";
import { DEFAULT_VALUE, INITIAL_PAGE, capitalizeFirstLetter, displayFormatDate, getDropDownCompanyDisplayData, paginationHandler } from "@Utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const RecentInterviews = () => {

  const STATUS_LIST = [
    { id: 'ALL', text: 'All' },
    { id: 'IS_STARTED', text: 'Yet to start' },
    { id: 'IS_COMPLETED', text: 'Completed' },
    {id:'IS_COMPLETE_REPORT',text:'Report not complete'}
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
    companies,
    selectedCompanyId
  } = useSelector((state: any) => state.SuperAdminReducer);

  useEffect(() => {
    const PAGE_PATH_NUMBER =selectedCompanyId?INITIAL_PAGE:recentInterviewsCurrentPages
    getRecentInterviewsHandler(PAGE_PATH_NUMBER);
  }, [filterCompanies.value.id, status.value?.id]);

  useEffect(() => {
    if (enterPress) {
      getRecentInterviewsHandler(INITIAL_PAGE);
    }
  }, [enterPress]);


  useEffect(() => {
    getCompaniesApiHandler();
  }, [])

  function proceedReport(id: string) {
    if (id) {
        goTo(ROUTES["designation-module"].report + "/" + id);
    }
}

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

    const companyId =selectedCompanyId?selectedCompanyId:filterCompanies.value.id;

    const filterStatus = {
      ...(status.value?.id === "IS_STARTED" && { is_started: true }),
      ...(status.value?.id === "IS_COMPLETED" && { is_complete: true }),
      ...(status.value?.id === "IS_COMPLETE_REPORT" && { is_report_complete: false })
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
      goTo(ROUTES['super-admin']["interview-info"] + "/" + id);
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

  const generateReportHandler =(id:any)=>{
    const params ={schedule_id:id }
    dispatch(
      fetchGenerateReport({
        params,
        onSuccess:(response:any)=>()=>{
          showToast(response.message, 'success')
        },
        onError: (error) => () => {
          // showToast(message, 'success')
         },
      })
    )
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


        const { id, interviewee_name, interviewee_role, interviewee_email, interviewee_experience, interview_duration, company_details,is_report_complete,interview_end_time,is_complete
        } = each;
        const name = company_details?.name
     
        return {
          'Company':name,
       
          'role':<div  style={{width:'180px'}} >
             <div className={"th-bold mb--1"} >
                                {capitalizeFirstLetter(interviewee_role)}
                            </div>
                            <span className={"th-light "}>
                                {`${interviewee_experience} years` }
                            </span>
          </div> ,
           'interviewee':<div style={{width:'200px'}} >
           <div className={"font-weight-600 mb--1"} >
                              {capitalizeFirstLetter(interviewee_name)}
                          </div>
                          <span className={" "} style={{marginTop:'10px'}}>
                             {interviewee_email}
                          </span>
        </div> ,
          // email: interviewee_email,
          duration: interview_duration,
          'Completed at':is_complete?<div style={{width:'140px'}}>
            {displayFormatDate(interview_end_time)}
          </div>:'',
          " ": (
            <div className={"d-flex align-items-center"}>
              {
                is_report_complete ?
                  <div className={"th-button"}>
                    <Button
                      block
                      outline
                      text={"Report"}
                      onClick={() => {
                        proceedReport(id);
                      }}
                    />
                  </div>:
                  is_complete &&(
                   <div className={"th-button"} style={{width:'150px'}}>
                   <Button
                     block
                     outline
                     text={"Generate Report"}
                     onClick={() => {
                       generateReportHandler(id)
                     }}
                   />
                 </div>
                  )
                    
                }
          
          
            </div>
          ),
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
          </div>,

     



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

       {!selectedCompanyId && <div className={'col-sm-3'}>
          <DropDown
            id={"companies"}
            heading={"Companies"}
            data={[DEFAULT_VALUE, ...getDropDownCompanyDisplayData(companies, 'display_name')]}
            selected={filterCompanies.value}
            onChange={filterCompanies.onChange}
          />
        </div>
}

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
        <div className={'overflow-auto py-3'}>
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

      {!loader.loader && recentInterviews?.length <= 0 && (
        <div className={"no-data-found"}>
          <NoDataFound />
        </div>
      )}
    </div>
  );
};

export { RecentInterviews };
