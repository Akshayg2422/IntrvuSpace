import { icons } from '@Assets';
import {  CommonTable, Input, MenuBar, Modal, NoDataFound, Spinner, showToast } from '@Components';
import { useInput, useLoader, useModal } from '@Hooks';
import { SettingHeader } from '@Modules';
import { addCandidate, getCandidates} from '@Redux';
import { ADD_CANDIDATE_RULES, INITIAL_PAGE, capitalizeFirstLetter, getValidateError, ifObjectExist, paginationHandler, validate } from '@Utils';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function CandidateList() {

  const dispatch = useDispatch()

  const {
    candidatesList,
    candidatesNumOfPages,
    candidatesCurrentPages,
  } = useSelector((state: any) => state.AdminReducer)


  const MENU = [{ id: '0', name: "Edit", icon: icons.edit }]

  const addCandidateModel = useModal(false);
  const [editId, setEditId] = useState<any>()
  const loader = useLoader(true)
  const addLoader = useLoader(false);
  const firstName = useInput("");
  const lastName = useInput("");
  const emailVerify = useInput("");
  const mobileNumber = useInput("");
  const inFocus = useRef<any>()


  useEffect(() => {
    getCandidateApiHandler(INITIAL_PAGE)
  }, [])


  const getCandidateApiHandler = (page_number: number) => {
    const params = {
      page_number,
    }
    loader.show();
    dispatch(
      getCandidates({
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

  const addCandidateApiHandler = () => {
    const params = {
        email:emailVerify.value,
        first_name:firstName.value,
        last_name:lastName.value,
        mobile_number:mobileNumber.value,
       ...(editId && { id: editId })
    }

    const validation = validate(ADD_CANDIDATE_RULES, params)

    if (ifObjectExist(validation)) {
      addLoader.show()

      dispatch(
        addCandidate({
          params,
          onSuccess: (success: any) => () => {
            addLoader.hide()
            modalCloseHandler()
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
      const { first_name,email,last_name,mobile_number } = el

      return {
        FirstName: capitalizeFirstLetter(first_name),
        LastName:capitalizeFirstLetter(last_name),
        Email:email,
        MobileNumber:mobile_number,
        '': ((first_name) &&
          <MenuBar
            menuData={MENU}
            onClick={(item) => {
              if (item?.id === MENU[0].id) {
                const { first_name,email,last_name,mobile_number,id } = el
                setEditId(id)
                firstName.set(first_name);
                lastName.set(last_name)
                mobileNumber.set(mobile_number)
                emailVerify.set(email)
                addCandidateModel.show()
             
              }
            }}
          />
        )
      };
    })

  };


  function modalCloseHandler() {
    addCandidateModel.hide();
    firstName.set('');
    lastName.set('')
    mobileNumber.set('')
    emailVerify.set('')
     setEditId('')
  }

  return (
    <>
      <div className={'screen-padding'}>
        <SettingHeader
          title={'Candidates'}
          buttonText={'Add'}
          onClick={addCandidateModel.show}
        />
        {
          loader.loader && <div className={'loader-container'}><Spinner /></div>
        }
        {
          !loader.loader &&
          candidatesList?.length > 0
          &&
          <CommonTable
            isPagination={candidatesNumOfPages > 1}
            title={'Candidates'}
            displayDataSet={normalizedTableData(candidatesList)}
            noOfPage={candidatesNumOfPages}
            currentPage={candidatesCurrentPages}
            paginationNumberClick={(currentPage) => {
                getCandidateApiHandler(paginationHandler("current", currentPage));

            }}
            previousClick={() => {
                getCandidateApiHandler(paginationHandler("prev", candidatesCurrentPages))
            }
            }
            nextClick={() => {
                getCandidateApiHandler(paginationHandler("next", candidatesCurrentPages));
            }
            }
          />
        }
        {
          !loader.loader &&
          candidatesList?.length <= 0 &&
          <div className={'no-data-container'}>
            <NoDataFound />
          </div>
        }
      </div >

      <Modal
        loading={addLoader.loader}
        title={`${editId ? "Edit" : "Add"} Candidate`}
        isOpen={addCandidateModel.visible}
        onClose={modalCloseHandler}
        onClick={addCandidateApiHandler}
      >
        <div className='row'>
          <div className='col-sm-6'>
            <Input
              heading={"First Name"}
              innerRef={inFocus}
              value={firstName.value}
              onChange={firstName.onChange}
            />

          </div>

          <div className='col-sm-6'>
            <Input
              heading={"LastName"}
              value={lastName.value}
              onChange={lastName.onChange}
            />
          </div>

          <div className='col-sm-6'>
            <Input
              heading={"Email"}
              value={emailVerify.value}
              onChange={emailVerify.onChange}
            />
          </div>

          <div className='col-sm-6'>
            <Input
              heading={"Mobile Number"}
              value={mobileNumber.value}
              onChange={mobileNumber.onChange}
            />
          </div>
        </div>
      </Modal >
    </>
  )
}

export { CandidateList };
