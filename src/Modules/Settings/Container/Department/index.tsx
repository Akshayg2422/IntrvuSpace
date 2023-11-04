import React, { Component, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addDepartmentCorporate, getDepartmentCorporate} from '@Redux';
import { useInput, useLoader, useModal } from '@Hooks';
import { translate } from "@I18n";
import { Back, Button, Card, CommonTable,Input, MenuBar, Modal, showToast } from '@Components';
import {  getValidateError, ifObjectExist, validate,ADD_DEPARTMENT_CORPORATE_RULES } from '@Utils';
import { icons } from '@Assets';


function Department() {
  const dispatch = useDispatch()

  const addDepartment = useModal(false);

  const name = useInput("");
  const addDepartmentLoader = useLoader(false);
  const { departmentCorporate } = useSelector((state: any) => state.DashboardReducer)
  console.log('DepartmentCorp===========', departmentCorporate);

  const getDepartmentMenu = () => [
    { id: '0', name: "Edit", icon: icons.edit },
]



  useEffect(() => {
    getDepartmentCorporateDetailsApiHandler()
  }, [])

  const addSectorCorporateDetailsApiHandler = () => {
    const params = {
      name: name.value,
    }
    console.log('Department========>', params);

    const validation = validate(ADD_DEPARTMENT_CORPORATE_RULES, params)

    if (ifObjectExist(validation)) {
      addDepartmentLoader.show()
      dispatch(
        addDepartmentCorporate({
          params,
          onSuccess: (success: any) => () => {
            addDepartment.hide()
            name.set('')
            addDepartmentLoader.hide()
            getDepartmentCorporateDetailsApiHandler()
            showToast(success.message, 'success')
          },
          onError: (error: any) => () => {
            addDepartmentLoader.hide()
            showToast(error.error_message, 'error')
          },
        })
      )
    } else {
      addDepartmentLoader.hide()
      showToast(getValidateError(validation))
    }
  };

  const getDepartmentCorporateDetailsApiHandler = () => {
    const params = {}
    dispatch(
      getDepartmentCorporate({
        params,
        onSuccess: (success: any) => () => {
          console.log('sector====================>', JSON.stringify(success));


        },
        onError: (error: string) => () => {
        },
      })
    );
  };

  const normalizedTableData = (data: any) => {
    return data?.map((el: any) => {
      console.log('dept==========>',el);

      return {
        Name: el.name,
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
              addDepartment.show()
            }}
          />
        </div>
        <div className='row px-0  mx--4'>
          <div className='col-sm-12 px-0'>
            <CommonTable
              card
              isPagination
              title={'Department'}
              displayDataSet={normalizedTableData(departmentCorporate)}
            />
          </div>
        </div>
      </div>
      < Modal size={'lg'} title={"Add Department"} isOpen={addDepartment.visible} onClose={() => {
        addDepartment.hide()
        name.set("")
      }} >
        <div className="col-md-9">
          <div className="mt--2">
            <Input
              heading={"Name"}
              value={name.value}
              onChange={name.onChange}
            />
          </div>
        </div>
        <div className="col text-right ">
          <Button size={'md'}
            loading={addDepartmentLoader.loader}
            text={"Submit"}
            onClick={addSectorCorporateDetailsApiHandler}
          />
        </div>
      </Modal >
    </>
  )
}

export { Department }
