/* eslint-disable react-hooks/exhaustive-deps */

import { Button, DesignationItem, DropDown, Heading, Input, InputHeading, Modal, NoDataFound, PageNation, ReactAutoComplete, Spinner, TextArea, showToast, TopNavbarCorporateFlow } from '@Components';
import { useDropDown, useInput, useLoader, useModal, useNavigation } from '@Hooks';
import { UploadCorporateOpeningsCard, } from '@Modules';
import { addDepartmentCorporate, addSectorCorporate, breadCrumbs, createCorporateSchedules, getCorporateSchedules, getDepartmentCorporate, getSectorCorporate, hideCreateOpeningsModal, setSelectedRole, updateCorporateSchedules } from '@Redux';
import { ROUTES } from '@Routes';
import { CREATE_CORPORATE_SCHEDULE_RULES, EXPERIENCE_LIST, INTERVIEW_DURATIONS, STATUS_LIST, getDropDownCompanyDisplayData, getValidateError, ifObjectExist, paginationHandler, validate, PLACEHOLDER_ROLES } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'

function Designation() {

  const {
    sectorsCorporate,
    departmentCorporate,
    isCreateOpening,
    corporateSchedules,
    corporateScheduleCount,
    corporateScheduleNumOfPages,
    corporateScheduleCurrentPages
  } = useSelector((state: any) => state.DashboardReducer)

  const { goTo } = useNavigation()
  const dispatch = useDispatch()

  const DEFAULT_VALUE = { id: '-1', text: "All" }

  /**
   * filter state
   */
  const positionSearch = useInput('')
  const filterDepartment = useDropDown(DEFAULT_VALUE);
  const filterSector = useDropDown(DEFAULT_VALUE);
  const status = useDropDown(STATUS_LIST[1]);


  /**
   *  create opening modal form state
   */

  const position = useInput('');
  const experience = useDropDown(EXPERIENCE_LIST[0])
  const vacancies = useInput('1')
  const jd = useInput('');
  const [duration, setDuration] = useState<any>(INTERVIEW_DURATIONS[0])
  const [selectSector, setSelectedSector] = useState<any>('')
  const [selectDepartment, setSelectedDepartment] = useState<any>('')


  /**
   * loader state
   */
  const listLoader = useLoader(false);
  const createOpeningLoader = useLoader(false);





  useEffect(() => {
    getCorporateScheduleApiHandler(corporateScheduleCurrentPages);
  }, [filterSector.value, filterDepartment.value, status.value]);



  useEffect(() => {
    getSectorsCorporateApiHandler();
    getDepartmentCorporateApiHandler();
  }, [])

  const getSectorsCorporateApiHandler = () => {
    const params = {}
    dispatch(
      getSectorCorporate({
        params,
        onSuccess: () => () => {
        },
        onError: () => () => {
        },
      })
    )
  }

  const addSectorCorporateApiHandler = (value) => {
    const params = { name: value, description: null };
    dispatch(
      addSectorCorporate({
        params,
        onSuccess: (response) => () => {
          const { details } = response;
          setSelectedSector(details);
          getSectorsCorporateApiHandler();
        },
        onError: (error) => () => { },
      })
    );
  };

  const getDepartmentCorporateApiHandler = () => {
    const params = {};
    dispatch(
      getDepartmentCorporate({
        params,
        onSuccess: (response: any) => () => { },
        onError: () => () => { },
      })
    );
  };

  const addDepartmentApiHandler = (value) => {
    const params = { name: value };
    dispatch(
      addDepartmentCorporate({
        params,
        onSuccess: (response: any) => () => {
          const { details } = response;
          setSelectedDepartment(details);
          getDepartmentCorporateApiHandler();
        },
        onError: (error) => () => { },
      })
    );
  };

  const createCorporateScheduleApiHandler = () => {

    const params = {
      ...(selectSector ? { sector_id: selectSector.id } : {}),
      ...(selectDepartment ? { department_id: selectDepartment?.id } : {}),
      role: position.value,
      experience: parseInt(experience.value?.id),
      jd: jd.value,
      vacancies: vacancies?.value,
      interview_duration: duration?.value,
    }

    const validation = validate(CREATE_CORPORATE_SCHEDULE_RULES, params);

    if (ifObjectExist(validation)) {
      createOpeningLoader.show()
      dispatch(
        createCorporateSchedules({
          params,
          onSuccess: (response) => () => {
            getCorporateScheduleApiHandler(corporateScheduleCurrentPages)
            createOpeningLoader.hide()
            showToast(response.message, 'success');
            resetValues()
            dispatch(hideCreateOpeningsModal())
          },
          onError: (error) => () => {
            showToast(error.error_message, 'error');
            createOpeningLoader.hide()
          },
        })
      )
    } else {
      showToast(getValidateError(validation))
    }
  };



  function resetValues() {
    position.set("")
    experience.set({})
    jd.set("")
    vacancies.set('')
    setDuration(INTERVIEW_DURATIONS[0]);
  }



  const getCorporateScheduleApiHandler = (page_number: number) => {
    const filterStatus = status.value?.id === 'ACV' ? { is_active: true } : status.value?.id === 'CSD' ? { is_active: false } : undefined;
    const params = {
      page_number,
      ...(positionSearch?.value && { position: positionSearch?.value }),
      ...(filterStatus && filterStatus),
      ...((filterSector && filterSector.value.id !== '-1') && { sector_id: filterSector?.value?.id }),
      ...((filterDepartment && filterDepartment.value.id !== '-1') && { department_id: filterDepartment?.value?.id })
    }

    listLoader.show();
    dispatch(
      getCorporateSchedules({
        params,
        onSuccess: () => listLoader.hide,
        onError: () => listLoader.hide,
      })
    )
  }

  /**
   * close create opening modal 
   */

  function hideCreateOpeningModal() {
    dispatch(hideCreateOpeningsModal())
  }


  function viewMoreDetailsHandler(status: boolean, index: number) {
    const updateData = [...corporateSchedules]
    updateData[index] = { ...updateData[index], is_view_more: status }
    dispatch(updateCorporateSchedules(updateData))
  }

  console.log(corporateScheduleCount);


  return (
    <div className={'screen'}>
      <TopNavbarCorporateFlow />
      {
        listLoader.loader && <div className={'loader-container'}><Spinner /></div>
      }

      {
        !listLoader.loader && corporateScheduleCount <= 1000 && <UploadCorporateOpeningsCard />
      }
      {
        corporateScheduleCount > 100 &&
        <div className={'screen-container'}>
          <div className='row'>
            <div className='col-sm-3'>
              <Input
                heading={'Position'}
                type={'text'}
                placeHolder={"HR Executive, QA Manager..."}
                value={positionSearch?.value}
                onChange={positionSearch.onChange}
              />
            </div>
            <div className="col-sm-3">
              <DropDown
                id={'status'}
                heading={'Status'}
                data={STATUS_LIST}
                selected={status.value}
                onChange={status.onChange}

              />
            </div>
            <div className='col-sm-3'>
              {departmentCorporate && departmentCorporate.length > 0 && <DropDown
                id={'department'}
                heading={'Department'}
                data={[DEFAULT_VALUE, ...getDropDownCompanyDisplayData(departmentCorporate)]}
                selected={filterDepartment.value}
                onChange={filterDepartment.onChange}
              />
              }
            </div>


            <div className='col-sm-3'>
              {sectorsCorporate && sectorsCorporate.length > 0 &&
                <DropDown
                  id={'sector'}
                  heading={'Sector'}
                  data={[DEFAULT_VALUE, ...getDropDownCompanyDisplayData(sectorsCorporate)]}
                  selected={filterSector.value}
                  onChange={filterSector.onChange}
                />
              }
            </div>

            <div></div>
          </div>

          <div>
            {
              corporateSchedules && corporateSchedules.length > 0 ?

                corporateSchedules.map((item: any, index: number) => {
                  return (
                    <div className={index === 0 ? 'schedule-container-top' : 'schedule-container'}>
                      <DesignationItem
                        key={index}
                        item={item}
                        onViewMore={
                          (status) => viewMoreDetailsHandler(status, index)
                        }
                        onViewDetails={() => {
                          dispatch(setSelectedRole(item));
                          goTo(ROUTES['designation-module']['variant-info']);
                        }}
                      />
                    </div>
                  );
                })
                :
                <div className={'no-data-container'}>
                  < NoDataFound />
                </div>
            }
          </div>
          {
            corporateScheduleNumOfPages > 1 &&
            <div className='mt-3'>
              <PageNation
                currentPage={corporateScheduleCurrentPages}
                noOfPage={corporateScheduleNumOfPages}
                isPagination={corporateScheduleNumOfPages}
                paginationNumberClick={(currentPage) => {
                  getCorporateScheduleApiHandler(paginationHandler("current", currentPage));
                }}
                previousClick={() => {
                  getCorporateScheduleApiHandler(paginationHandler("prev", corporateScheduleCurrentPages))
                }
                }
                nextClick={() => {
                  getCorporateScheduleApiHandler(paginationHandler("next", corporateScheduleCurrentPages));
                }}
              />
            </div>
          }
        </div>
      }

      <Modal
        loading={createOpeningLoader.loader}
        isOpen={isCreateOpening}
        title={'Create Opening'}
        subTitle={'Input job details, specifying qualifications, requirements, interview duration'}
        buttonText={'Create Opening'}
        onClose={hideCreateOpeningModal}
        onClick={createCorporateScheduleApiHandler}

      >
        <div className={'create-opening-container'}>
          <div className='row m-0 p-0'>
            <div className={'col-sm-5 m-0 p-0'}>
              <Input
                heading={'Position'}
                type={'text'}
                placeHolder={"HR Executive, QA Manager..."}
                value={position.value}
                onChange={position.onChange} />
            </div>

            <div className={'col-sm-4 m-0 p-0'}>
              <div className={'opening-form-container'}>
                <DropDown
                  heading={'Experience'}
                  id={'experience'}
                  data={EXPERIENCE_LIST}
                  selected={experience.value}
                  onChange={experience.onChange}
                />
              </div>
            </div>
            <div className={'col-sm-3 m-0 p-0 opening-form-container'}>
              <div className={'opening-form-container'}>
                <Input
                  heading={'Vacancies'}
                  type={'number'}
                  placeHolder={"0"}
                  value={vacancies.value}
                  onChange={vacancies.onChange}
                  maxLength={4}
                />
              </div>
            </div>
          </div>


          <TextArea
            heading='Job Description'
            value={jd.value}
            placeholder={PLACEHOLDER_ROLES}
            className={"p-4"}
            onChange={jd.onChange} />

          <div className={'duration-container'}>
            <InputHeading heading={'Duration'} />
            <div className={'duration-content-container'}>
              {
                INTERVIEW_DURATIONS.map((item: any, index: number) => {
                  const { id, subText } = item
                  return (
                    <div className={index === 0 ? 'each-duration' : 'each-duration each-duration-space'}>
                      <Button
                        block
                        outline
                        className={`${duration?.id === id ? 'btn-outline-primary-active' : 'btn-outline-primary-inactive'}`}
                        text={subText}
                        onClick={() => {
                          setDuration(item)
                        }}
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='group-container row'>
            <div className={'col-sm-6'}>
              <ReactAutoComplete
                selected={selectDepartment?.name}
                data={departmentCorporate}
                heading={"Department"}
                placeholder={'Department, Account...'}
                onAdd={(value: string) => {
                  addDepartmentApiHandler(value)
                }}
                onSelected={setSelectedDepartment}
              />
            </div>
            <div className={'col-sm-6'}>
              <ReactAutoComplete
                selected={selectSector?.name}
                data={sectorsCorporate}
                placeholder={'Software, Healthcare...'}
                heading={"Sector"}
                onAdd={(value: any) => {
                  addSectorCorporateApiHandler(value)
                }}
                onSelected={setSelectedSector}
              />
            </div>

          </div>
        </div>
      </Modal >
    </div >
  )
}

export { Designation };
