import { icons } from '@Assets';
import { Button, CommonTable, DropDown, Heading, Image, Input, MenuBar, Modal, NoRecordsFound, Spinner, showToast } from '@Components';
import { useDropDown, useInput, useLoader, useModal, useNavigation } from '@Hooks';
import { addTeamMateData, getDepartmentCorporate, getDesignations, getTeamMateData } from '@Redux';
import { USER_FORM_RULES, getDropDownDisplayData, getValidateError, ifObjectExist, paginationHandler, validate } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function ManageTeamMate() {
  const dispatch = useDispatch()
  const { goBack } = useNavigation();
  const addTeamMateModel = useModal(false);
  const addTeamMateLoader = useLoader(false);
  const firstName = useInput("");
  const lastName = useInput("")
  const isEmail = useInput("");
  const contactNumber = useInput("");
  const [editId, setEditId] = useState<any>()
  const departments = useDropDown({})
  const isDesignation = useDropDown({})
  const [selectTeamMate, setSelectTeamMate] = useState<any>('')
  const [loading, setLoading] = useState(true)
  const { departmentCorporate, designations, teams, teamNumOfPages, teamCurrentPages } = useSelector((state: any) => state.DashboardReducer)

  const getDesignationMenu = () => [
    { id: '0', name: "Edit", icon: icons.edit },
  ]

  useEffect(() => {
    getTeamMateDataHandler(1)
    getDepartmentCorporateDetailsApiHandler()
    getDesignationApiHandler()
  }, [])

  const addTeamMAteDataApiHandler = () => {
    const params = {
      first_name: firstName.value,
      last_name: lastName.value,
      mobile_number: contactNumber.value,
      email: isEmail.value,
      department_id: departments.value?.id,
      designation_id: isDesignation.value?.id,
      ...(editId && { id: editId })
    }


    const validation = validate(USER_FORM_RULES, params)

    if (ifObjectExist(validation)) {
      addTeamMateLoader.show()
      dispatch(
        addTeamMateData({
          params,
          onSuccess: (success: any) => () => {
            addTeamMateModel.hide()
            TeamDatas()
            setEditId('')
            addTeamMateLoader.hide()
            getTeamMateDataHandler(teamCurrentPages)
            showToast(success.message, 'success')
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

  const getTeamMateDataHandler = (page_number: number) => {
    const params = {
      page_number,
    }
    // console.log('parammmmmmmmmmmmmm',params);

    dispatch(
      getTeamMateData({
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

  const getDepartmentCorporateDetailsApiHandler = () => {
    const params = {
    }
    console.log('pppp', params)
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

  const getDesignationApiHandler = () => {
    const params = {

    };

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

  const normalizedTableData = (data: any) => {

    return data && data.length > 0 && data.map((el: any) => {
      const { first_name, last_name, mobile_number, email, department, designation } = el

      return {
        firstName: el.first_name,
        lastName: el.last_name,
        contactNumber: el.mobile_number,
        email: el.email,
        department: el?.department?.name,
        designation: el?.designation?.name,

        '': ((first_name || last_name || mobile_number || email || department || designation) &&
          <MenuBar menuData={getDesignationMenu()}
            icon={icons.more}
            onClick={(item) => {

              if (item?.id === '0') {
                const { id, first_name, last_name, mobile_number, email, department, designation } = el

                setEditId(id)
                firstName.set(first_name)
                lastName.set(last_name)
                contactNumber.set(mobile_number)
                isEmail.set(email)
                departments.set(department)
                isDesignation.set(designation)
                addTeamMateModel.show()
              }

            }} />

        )
      };
    });
  };

  function TeamDatas() {
    firstName.set('')
    lastName.set('')
    isEmail.set('')
    contactNumber.set('')
    departments.set('')
    isDesignation.set('')
  }


  return (
    <>
      <div className='container'>
        <div className="row justify-content-between mt-3 pl-2 mr--2 mb-3">
          {/* <Back /> */}
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
              <span className='headingText text-secondary'>{'Manage TeamMate'}</span>
            </div>
          </div>
          <Button
            className={'btn btn-primary rounded-sm'}
            size={'md'}
            text={"Add TeamMate"}
            onClick={() => {
              addTeamMateModel.show()
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
            <div className='col-md-12 px-0'>
              {teams && teams?.data?.length > 0 ? (
                <CommonTable
                  card
                  title={'TeamMate'}
                  isPagination={teamNumOfPages > 1}
                  tableDataSet={teams}
                  displayDataSet={normalizedTableData(teams?.data)}
                  noOfPage={teamNumOfPages}
                  currentPage={teamCurrentPages}
                  paginationNumberClick={(currentPage) => {

                    getTeamMateDataHandler(paginationHandler("current", currentPage));

                  }}
                  previousClick={() => {
                    getTeamMateDataHandler(paginationHandler("prev", teamCurrentPages))
                  }
                  }
                  nextClick={() => {
                    getTeamMateDataHandler(paginationHandler("next", teamCurrentPages));
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
      < Modal size={'lg'} isOpen={addTeamMateModel.visible} onClose={() => {
        addTeamMateModel.hide()
        TeamDatas()
        setEditId("")
      }} style={{ padding: 0 }}>
        <div className='px-md-6'>
          <div className='mt--2'>  <Heading heading={`${editId ? "Edit" : "Add"} TeamMate`} style={{ fontSize: '25px', fontWeight: 800, }} /></div>

          <div className="mt-5">

            <div className='row '>
              <div className="mt--2 col">
                <Input
                  heading={"FirstName"}
                  placeholder={'FirstName'}
                  value={firstName.value}
                  onChange={firstName.onChange}
                />
              </div>
              <div className="mt--2 col">
                <Input

                  heading={'LastName'}
                  placeholder={'LastName'}
                  value={lastName.value}
                  onChange={lastName.onChange}

                />
              </div>
            </div>
            <div className='row'>
              <div className="mt--2 col">
                <Input

                  heading={'Email'}
                  placeholder={'email'}
                  value={isEmail.value}
                  onChange={isEmail.onChange}

                />
              </div>
              <div className="mt--2 col">
                <Input

                  heading={'ContactNumber'}
                  placeholder={'contactNumber'}
                  type={"number"}
                  maxLength={10}
                  value={contactNumber.value}
                  onChange={contactNumber.onChange}

                />
              </div>
            </div>
            <div className='row'>
              <div className="mt--2 col">
                <DropDown
                  heading={"Department"}
                  placeHolder={" Department"}
                  data={getDropDownDisplayData(departmentCorporate)}
                  selected={departments.value}
                  onChange={departments.onChange}
                  id=''
                />
              </div>
              <div className="mt--2 col">
                <DropDown
                  heading={"Designation"}
                  placeHolder={" Designation"}
                  data={getDropDownDisplayData(designations)}
                  selected={isDesignation.value}
                  onChange={isDesignation.onChange}
                  id=''
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-center py-5">
          <Button size={'lg'}
            className={'rounded-sm px-5 btn btn-primary '}
            style={{
              borderColor: "#d8dade",
              fontSize: "15px"
            }}
            loading={addTeamMateLoader.loader}
            text={"Submit"}
            onClick={addTeamMAteDataApiHandler}
          />
        </div>
      </Modal >
    </>
  )
}

export { ManageTeamMate };
