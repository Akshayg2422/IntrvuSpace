import React, { Component, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addDepartmentCorporate, addTeamMateData, getDepartmentCorporate, getTeamMateData } from '@Redux';
import { useDropDown, useInput, useLoader, useModal } from '@Hooks';
import { translate } from "@I18n";
import { Back, Button, Card, CommonTable, DropDown, Input, Modal, showToast } from '@Components';
import { getValidateError, ifObjectExist, validate, ADD_DEPARTMENT_CORPORATE_RULES, GENDER_LIST, getDropDownDisplayData } from '@Utils';


function AddTeamMate() {
  const dispatch = useDispatch()
  const addTeamMate = useModal(false);
  const addTeamMateLoader = useLoader(false);
  const fullName = useInput("");
  const email = useInput("");
  const contactNumber = useInput("");
  const lastName = useInput("")
  // const gender = useDropDown(GENDER_LIST[0]);
  const department = useDropDown({})
  const designation = useDropDown({})
  const { departmentCorporate, designations,getTeamMateDatas } = useSelector((state: any) => state.DashboardReducer)

  console.log('getTeamMateDatas===========', JSON.stringify(getTeamMateDatas));



  useEffect(() => {
    getTeamMateDataHandler()
  }, [])

  const addTeamMAteDataApiHandler = () => {
    const params = {
      first_name: fullName.value,
      last_name: lastName.value,
      mobile_number: contactNumber.value,
      email: email.value,
      department_id: department.value.id,
      designation_id: designation.value.id,
    }
    console.log('teamMAte========>', params);

    const validation = validate(ADD_DEPARTMENT_CORPORATE_RULES, params)

    if (ifObjectExist(validation)) {
      addTeamMateLoader.show()
      dispatch(
        addTeamMateData({
          params,
          onSuccess: (success: any) => () => {
            addTeamMate.hide()
            fullName.set('')
            // lastName.set('')
            // email.set('')
            // contactNumber.set('')
            // department.set('')
            // designation.set('')
            addTeamMateLoader.hide()
            getTeamMateDataHandler()
            showToast(success.message, 'success')

            console.log('Successsssssssssssss==>',success);
            
          },
          onError: (error: any) => () => {
            addTeamMateLoader.hide()
            showToast(error.error_message, 'error')
          },
        })
      )
    } else {
      addTeamMateLoader.hide()
      showToast(getValidateError(validation))
    }
  };

  const getTeamMateDataHandler = () => {
    const params = {

    }
    dispatch(
      getTeamMateData({
        params,
        onSuccess: (success: any) => () => {
          console.log('getTeam====================>', JSON.stringify(success));


        },
        onError: (error: string) => () => {
        },
      })
    );
  };

  const normalizedTableData = (data: any) => {
    console.log(data,"data................")
    return data?.map((el: any) => {
      console.log('GetTeam==========>', el);
      return {
        fullName: el?.first_name,
        lastName: el?.last_name,
        contactNumber:el?.mobile_number,
        email:el?.email,
        department:el?.department_id,
        designation:el?.branch_id,
      };
    });
  };

  return (
    <>
      <div className='container-fluid'>
        <div className="row justify-content-between mt-2 pl-2 mr--2 mb-3">
          <Back />
          <Button
            className={'text-white shadow-none'}
            size={'sm'}
            text={"Add Department"}
            onClick={() => {
              addTeamMate.show()
            }}
          />
        </div>
        <div className='row px-0  mx--4'>
          <div className='col-sm-12 px-0'>
            <CommonTable
              card
              isPagination
              title={'Add TeamMate'}
              displayDataSet={normalizedTableData([getTeamMateDatas])}
            />
          </div>
        </div>
      </div>
      < Modal size={'lg'} title={"Add TeamMate"} isOpen={addTeamMate.visible} onClose={() => {
        addTeamMate.hide()
        fullName.set("")
      }} >
        <div className="col-md-9">
          <div className="mt--2">
            <Input
              heading={"fullName"}
              value={fullName.value}
              onChange={fullName.onChange}
            />
          </div>
          <div className="mt--2">
            <Input

              heading={'LastName'}
              placeholder={'LastName'}
              value={lastName.value}
              onChange={lastName.onChange}

            />
          </div>
          <div className="mt--2">
            <Input

              heading={'Email'}
              placeholder={'email'}
              value={email.value}
              onChange={email.onChange}

            />
          </div>
          <div className="mt--2">
            <Input

              heading={'ContactNumber'}
              placeholder={'contactNumber'}
              type={"number"}
              maxLength={10}
              value={contactNumber.value}
              onChange={contactNumber.onChange}

            />
          </div>
          <div className="mt--2">
            <DropDown
              heading={"Department"}
              placeHolder={" Department"}
              data={getDropDownDisplayData(departmentCorporate)}
              selected={designation.value}
              onChange={designation.onChange}
              id=''
            />
          </div>
          <div className="mt--2">
            <DropDown
              heading={"Designation"}
              placeHolder={" Designation"}
              data={getDropDownDisplayData(designations)}
              selected={designation.value}
              onChange={designation.onChange}
              id=''
            />
          </div>

        </div>
        <div className="col text-right ">
          <Button size={'md'}
            loading={addTeamMateLoader.loader}
            text={"Submit"}
            onClick={addTeamMAteDataApiHandler}
          />
        </div>
      </Modal >
    </>
  )
}

export { AddTeamMate }
