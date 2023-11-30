import React, { useEffect, useRef, useState } from 'react'
import { Spinner, NoDataFound, CommonTable, MenuBar, Modal, Input, DropDown, showToast, AutoFocusInput, Button, ScreenHeading } from '@Components';
import { useDropDown, useInput, useLoader, useModal } from '@Hooks';
import { INITIAL_PAGE, paginationHandler, capitalizeFirstLetter, getDropDownDisplayData, getValidateError, ifObjectExist, validate, USER_FORM_RULES } from '@Utils';
import { useSelector, useDispatch } from 'react-redux';
import { getTeamMateData, getDepartmentCorporate, getDesignations, addTeamMateData } from '@Redux';
import { icons } from '@Assets'

function ManageTeamMate() {


  const dispatch = useDispatch();

  const { teams, teamNumOfPages, teamCurrentPages, departmentCorporate, designations } = useSelector((state: any) => state.DashboardReducer)


  const MENU = [
    { id: '0', name: "Edit", icon: icons.edit },
  ]



  /**
   * add team mate state
   */

  const addTeammateLoader = useLoader(false);
  const addTeamMateModal = useModal(false);

  const firstName = useInput('');
  const lastName = useInput('');
  const teamEmail = useInput('');
  const mobileNumber = useInput('');
  const teamDepartment = useDropDown({});
  const teamDesignation = useDropDown({});
  const [editId, setEditId] = useState<any>()
  const [selectedTeam, setSelectedTeam] = useState<any>(undefined)
  const inFocus = useRef<any>(null)



  /**
   * get team state
   */

  const loader = useLoader(false);



  useEffect(() => {
    getTeamsApiHandler(INITIAL_PAGE)


    getDepartmentApiHandler();
    getDesignationApiHandler();
  }, [])


  /**
   * get teams 
   */


  const getTeamsApiHandler = (page_number: number) => {
    const params = {
      page_number,
    }

    loader.show();

    dispatch(
      getTeamMateData({
        params,
        onSuccess: (success: any) => () => {
          loader.hide();

        },
        onError: (error: string) => () => {
          loader.hide();
        },
      })
    );
  };


  /**
   *  get department 
   */

  const getDepartmentApiHandler = () => {
    const params = {}
    dispatch(
      getDepartmentCorporate({
        params,
        onSuccess: (success: any) => () => {
        },
        onError: (error: string) => () => {
        },
      })
    );
  };


  /**
   *  get Designation api Handler
   */

  const getDesignationApiHandler = () => {
    const params = {};

    dispatch(
      getDesignations({
        params,
        onSuccess: (response: any) => () => {

        },
        onError: (error: string) => () => {

        },
      })
    );
  };



  /**
   * add teammate api handler
   */


  const addTeamMAteDataApiHandler = () => {
    const params = {
      first_name: firstName.value,
      last_name: lastName.value,
      mobile_number: mobileNumber.value,
      email: teamEmail.value,
      department_id: teamDepartment.value?.id,
      designation_id: teamDesignation.value?.id,
      ...(selectedTeam && { id: selectedTeam?.id })
    }


    const validation = validate(USER_FORM_RULES, params)

    if (ifObjectExist(validation)) {

      addTeammateLoader.show()


      dispatch(
        addTeamMateData({
          params,
          onSuccess: (success: any) => () => {
            addTeammateLoader.hide()

            /**
             * reset value
             */

            resetValues();

            getTeamsApiHandler(teamCurrentPages)
            showToast(success.message, 'success')
          },
          onError: (error: any) => () => {
            addTeammateLoader.hide()
            showToast(error.error_message, 'error')
          },
        })
      )
    } else {
      showToast(getValidateError(validation))
    }
  };

  const normalizedTableData = (data: any) => {

    return data && data.length > 0 && data.map((el: any) => {
      const { first_name, last_name, mobile_number, email, department, designation } = el

      return {
        "First Name": capitalizeFirstLetter(first_name),
        "Last Name": last_name,
        "Contact Number": mobile_number,
        "Email": email,
        "Department": department?.name,
        "Designation": designation?.name,
        '':
          <MenuBar
            menuData={MENU}
            onClick={(item) => {

              if (item.id === MENU[0].id) {

                addTeamMateModal.show();

                setEditId(el)
                setSelectedTeam(el);
                firstName.set(first_name)
                lastName.set(last_name)
                teamEmail.set(email)
                mobileNumber.set(mobile_number)
                teamDepartment.set(department)
                teamDesignation.set(designation)

              }

            }} />
      };
    });
  };


  function resetValues() {
    addTeamMateModal.hide()
    setEditId(undefined);

    /**
     * reset value
     */

    firstName.set('')
    lastName.set('')
    teamEmail.set('')
    mobileNumber.set('')
    teamDesignation.set({})
    teamDepartment.set({})
    setSelectedTeam(undefined)
  }

  return (
    <>
      <div className={'screen-padding'}>
        <ScreenHeading
          text={'Team'}
          children={
            <div className={'d-flex justify-content-end'}>
              <div className={'btn-wrapper'}>
                <Button
                  block
                  text={'Add'}
                  onClick={addTeamMateModal.show}
                />
              </div>
            </div>
          }
        />

        {
          loader.loader && <div className={'loader-container'}><Spinner /></div>
        }

        {
          !loader.loader &&
          teams?.length > 0 &&
          <CommonTable
            isPagination={teamNumOfPages > 1}
            displayDataSet={normalizedTableData(teams)}
            noOfPage={teamNumOfPages}
            currentPage={teamCurrentPages}
            paginationNumberClick={(currentPage) => {
              getTeamsApiHandler(paginationHandler("current", currentPage));

            }}
            previousClick={() => {
              getTeamsApiHandler(paginationHandler("prev", teamCurrentPages))
            }
            }
            nextClick={() => {
              getTeamsApiHandler(paginationHandler("next", teamCurrentPages));
            }
            }
          />
        }
        {
          !loader.loader && teams?.length <= 0 &&
          <div className={'no-data-container'}>
            <NoDataFound />
          </div>
        }
      </div>
      <Modal
        loading={addTeammateLoader.loader}
        title={`${editId ? "Edit" : "Add"} `}
        isOpen={addTeamMateModal.visible}
        onClose={resetValues}
        onClick={addTeamMAteDataApiHandler}
      >

        <div className='row'>
          <div className="col-sm-6">
            <Input
              heading={"First Name"}
              placeholder={'First Name'}
              value={firstName.value}
              onChange={firstName.onChange}
              innerRef={inFocus}

            />
          </div>
          <div className={'col-sm-6'}>
            <Input
              heading={'Last Name'}
              placeholder={'Last Name'}
              value={lastName.value}
              onChange={lastName.onChange}
            />
          </div>

        </div>

        <div className='row'>
          <div className="col-sm-6">
            <Input
              heading={"Email"}
              placeholder={'Email'}
              value={teamEmail.value}
              onChange={teamEmail.onChange}
            />
          </div>
          <div className={'col-sm-6'}>
            <Input
              type={'number'}
              maxLength={10}
              heading={'Mobile Number'}
              placeholder={'Mobile Number'}
              value={mobileNumber.value}
              onChange={mobileNumber.onChange}

            />
          </div>

        </div>



        <div className='row'>
          <div className="col-sm-6">
            <DropDown
              id={'department'}
              heading={"Department"}
              placeHolder={" Department"}
              data={getDropDownDisplayData(departmentCorporate)}
              selected={teamDepartment.value}
              onChange={teamDepartment.onChange}
            />
          </div>
          <div className={'col-sm-6'}>
            <DropDown
              id={'designation'}
              heading={"Designation"}
              placeHolder={" Designation"}
              data={getDropDownDisplayData(designations)}
              selected={teamDesignation.value}
              onChange={teamDesignation.onChange}
            />
          </div>
        </div>
      </Modal >
    </>
  )
}

export { ManageTeamMate }