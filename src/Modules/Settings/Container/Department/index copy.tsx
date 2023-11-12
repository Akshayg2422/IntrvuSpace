import React, { Component, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addDepartmentCorporate, getDepartmentCorporate } from '@Redux';
import { useInput, useLoader, useModal } from '@Hooks';
import { translate } from "@I18n";
import { Back, Button, Card, CommonTable, Heading, Input, MenuBar, Modal, NoRecordsFound, Spinner, showToast, Image } from '@Components';
import { getValidateError, ifObjectExist, validate, ADD_DEPARTMENT_CORPORATE_RULES, paginationHandler } from '@Utils';
import { icons } from '@Assets';
import { useNavigation } from '@Hooks';


function Department() {
  const dispatch = useDispatch()
  const { goBack } = useNavigation();
  const addDepartmentModel = useModal(false);
  const DepartmentName = useInput("");
  const addDepartmentLoader = useLoader(false);
  const [editId, setEditId] = useState<any>()
  const [loading, setLoading] = useState(true);
  const { departmentCorporate, departmentsCorporateCurrentPages,
    departmentCorporateNumOfPages, } = useSelector((state: any) => state.DashboardReducer)

  // console.log('departmentCorporate===========>', departmentCorporate);

  const getDesignationMenu = () => [
    { id: '0', name: "Edit", icon: icons.edit },
  ]

  useEffect(() => {
    getDepartmentCorporateDetailsApiHandler(1)
  }, [])

  const addSectorCorporateDetailsApiHandler = () => {
    const params = {
      name: DepartmentName.value,
      ...(editId && { id: editId })
    }

    const validation = validate(ADD_DEPARTMENT_CORPORATE_RULES, params)

    if (ifObjectExist(validation)) {
      addDepartmentLoader.show()

      dispatch(
        addDepartmentCorporate({
          params,
          onSuccess: (success: any) => () => {
            addDepartmentModel.hide()
            DepartmentName.set('')
            setEditId('')
            addDepartmentLoader.hide()
            getDepartmentCorporateDetailsApiHandler(departmentsCorporateCurrentPages)
            showToast(success.message, 'success')
          },
          onError: (error: any) => () => {
            addDepartmentLoader.hide()
            showToast(error.error_message, 'error')
          },
        })
      )
    } else {

      showToast(getValidateError(validation))
    }
  };

  const getDepartmentCorporateDetailsApiHandler = (page_number: number) => {
    const params = {
      page_number,
    }
    dispatch(
      getDepartmentCorporate({
        params,
        onSuccess: (success: any) => () => {
          setLoading(false)
        },
        onError: (error: string) => () => {
          setLoading(false)
        },
      })
    );
  };

  const normalizedTableData = (data: any) => {
    return data.map((el: any) => {
      const { name } = el

      return {
        Name: el.name,
        '': ((name) &&
          <MenuBar menuData={getDesignationMenu()} icon={icons.more} onClick={(item) => {

            if (item?.id === '0') {
              const { name, id } = el

              setEditId(id)
              DepartmentName.set(name)
              addDepartmentModel.show()
            }

          }} />
        )
      };
    })

  };

  return (
    <>
      <div className='container'>
        <div className="row justify-content-between mt-3 pl-2 mr--2 mb-3">
          <div className='d-flex align-items-center'>
            <div className=''>
              <Image
                onClick={() => goBack()}
                style={{ cursor: "pointer" }}
                src={icons.back}
                height={15}
              />
            </div>
            <div className='pl-3' >
              <span className='headingText text-secondary'>{'Manage Department'}</span>
            </div>
          </div>

          <Button
            className='btn btn-primary rounded-sm '

            text={"Add Department"}
            onClick={() => {
              addDepartmentModel.show()
            }}
          />
        </div>
        {loading && (
          <div className={'vh-100 d-flex justify-content-center align-items-center'}>
            <Spinner />
          </div>)
        }

        {!loading &&
          <div className='row px-0  mx--4'>
            <div className='col-sm-12 px-0'>
              {departmentCorporate && departmentCorporate?.data?.length > 0 ? (
                <CommonTable
                  card
                  isPagination={departmentCorporateNumOfPages > 1}
                  title={'Department'}
                  displayDataSet={normalizedTableData(departmentCorporate?.data)}
                  noOfPage={departmentCorporateNumOfPages}
                  currentPage={departmentsCorporateCurrentPages}
                  paginationNumberClick={(currentPage) => {

                    getDepartmentCorporateDetailsApiHandler(paginationHandler("current", currentPage));

                  }}
                  previousClick={() => {
                    getDepartmentCorporateDetailsApiHandler(paginationHandler("prev", departmentsCorporateCurrentPages))
                  }
                  }
                  nextClick={() => {
                    getDepartmentCorporateDetailsApiHandler(paginationHandler("next", departmentsCorporateCurrentPages));
                  }
                  }
                />
              ) : (
                <div
                  className="vh-100 d-flex justify-content-center align-items-center ">
                  <NoRecordsFound />
                </div>
              )}

            </div>
          </div>
        }

      </div>
      < Modal size={'lg'} isOpen={addDepartmentModel.visible} onClose={() => {
        addDepartmentModel.hide()
        DepartmentName.set("")
        setEditId('')
      }} style={{ padding: 0 }}>

        <div className="px-md-5 ">

          <div className='mt--2'>  <Heading heading={`${editId ? "Edit" : "Add"} Department`} style={{ fontSize: '25px', fontWeight: 800, }} /></div>
          <div className="mt-3">
            <Input
              heading={"Name"}
              value={DepartmentName.value}
              onChange={DepartmentName.onChange}
            />
          </div>
        </div>
        <div className="col d-flex justify-content-center py-5">
          <Button
            size={'lg'}
            className={'rounded-sm px-5 btn btn-primary '}
            style={{
              borderColor: "#d8dade",
              fontSize: "15px"
            }}
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
