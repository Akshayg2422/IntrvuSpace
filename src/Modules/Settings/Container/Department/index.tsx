import { icons } from '@Assets';
import { AutoFocusInput, Button, CommonTable, Input, MenuBar, Modal, NoDataFound, ScreenHeading, Spinner, showToast } from '@Components';
// import AutoFocusInput from '@Components//Core/AutoFocusInput';
import { useInput, useLoader, useModal } from '@Hooks';
import { addDepartmentCorporate, getDepartmentCorporate } from '@Redux';
import { ADD_DEPARTMENT_CORPORATE_RULES, INITIAL_PAGE, capitalizeFirstLetter, getValidateError, ifObjectExist, paginationHandler, validate } from '@Utils';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Department() {

  const dispatch = useDispatch()

  const {
    departmentCorporate,
    departmentsCorporateCurrentPages,
    departmentCorporateNumOfPages,
  } = useSelector((state: any) => state.DashboardReducer)


  const MENU = [{ id: '0', name: "Edit", icon: icons.edit }]

  const addDepartmentModel = useModal(false);
  const [editId, setEditId] = useState<any>()
  const loader = useLoader(true)
  const addLoader = useLoader(false);
  const departmentName = useInput("");
  const inFocus = useRef<any>()


  useEffect(() => {
    getDepartmentApiHandler(INITIAL_PAGE)
  }, [])


  const getDepartmentApiHandler = (page_number: number) => {
    const params = {
      page_number,
    }
    loader.show();
    dispatch(
      getDepartmentCorporate({
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

  const addDepartmentApiHandler = () => {
    const params = {
      name: departmentName.value,
      ...(editId && { id: editId })
    }

    const validation = validate(ADD_DEPARTMENT_CORPORATE_RULES, params)

    if (ifObjectExist(validation)) {
      addLoader.show()

      dispatch(
        addDepartmentCorporate({
          params,
          onSuccess: (success: any) => () => {
            addLoader.hide()
            departmentName.set('')
            addDepartmentModel.hide();
            getDepartmentApiHandler(departmentsCorporateCurrentPages)
            setEditId('')
            showToast(success.message, 'success')
          },
          onError: (error: any) => () => {
            addLoader.hide()
            showToast(error.error_message, 'error')
          },
        })
      )
    } else {

      showToast(getValidateError(validation))
    }
  };


  const normalizedTableData = (data: any) => {
    return data.map((el: any) => {
      const { name } = el

      return {
        Name: capitalizeFirstLetter(name),
        '':
          <MenuBar
            menuData={MENU}
            onClick={(item) => {
              if (item?.id === MENU[0].id) {
                const { name, id } = el
                setEditId(id)
                departmentName.set(name)
                addDepartmentModel.show()
              }
            }}
          />

      };
    })

  };


  function modalCloseHandler() {
    addDepartmentModel.hide();
    departmentName.set('');
    setEditId('')
  }

  return (
    <>
      <div className={'screen-padding'}>
        <ScreenHeading
          text={'Departments'}
          children={
            <div className={'d-flex justify-content-end'}>
              <div className={'btn-wrapper'}>
                <Button
                  block
                  text={'Add'}
                  onClick={addDepartmentModel.show}
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
          departmentCorporate?.length > 0
          &&
          <CommonTable
            isPagination={departmentCorporateNumOfPages > 1}
            title={'Departments'}
            displayDataSet={normalizedTableData(departmentCorporate)}
            noOfPage={departmentCorporateNumOfPages}
            currentPage={departmentsCorporateCurrentPages}
            paginationNumberClick={(currentPage) => {
              getDepartmentApiHandler(paginationHandler("current", currentPage));

            }}
            previousClick={() => {
              getDepartmentApiHandler(paginationHandler("prev", departmentsCorporateCurrentPages))
            }
            }
            nextClick={() => {
              getDepartmentApiHandler(paginationHandler("next", departmentsCorporateCurrentPages));
            }
            }
          />
        }
        {
          !loader.loader &&
          departmentCorporate?.length <= 0 &&
          <div className={'no-data-container'}>
            <NoDataFound />
          </div>
        }
      </div >

      <Modal
        loading={addLoader.loader}
        title={`${editId ? "Edit" : "Create"} Department`}
        isOpen={addDepartmentModel.visible}
        onClose={modalCloseHandler}
        onClick={addDepartmentApiHandler}
      >
        <div className='row'>
          <div className='col-sm-6'>
            <Input
              heading={"Name"}
              innerRef={inFocus}
              value={departmentName.value}
              onChange={departmentName.onChange}
            />

          </div>
        </div>
      </Modal >
    </>
  )
}

export { Department };
