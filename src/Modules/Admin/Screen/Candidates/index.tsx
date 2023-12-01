import { icons } from '@Assets';
import { Button, CommonTable, Input, MenuBar, Modal, NoDataFound, ScreenHeading, Spinner, showToast } from '@Components';
import { useInput, useLoader, useModal } from '@Hooks';
import { addCandidate, getCandidates } from '@Redux';
import { ADD_CANDIDATE_RULES, INITIAL_PAGE, capitalizeFirstLetter, getValidateError, ifObjectExist, paginationHandler, validate } from '@Utils';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Candidates() {

  const dispatch = useDispatch()

  const {
    candidates,
    candidatesNumOfPages,
    candidatesCurrentPages,
  } = useSelector((state: any) => state.AdminReducer)


  const MENU = [{ id: '0', name: "Edit", icon: icons.edit }]

  const loader = useLoader(true)


  /**
   * add,Edit candidate state
   */
  const addCandidateModel = useModal(false);

  const [editId, setEditId] = useState<any>()
  const addLoader = useLoader(false);
  const firstName = useInput("");
  const lastName = useInput("");
  const mail = useInput("");
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
      email: mail.value,
      first_name: firstName.value,
      last_name: lastName.value,
      mobile_number: mobileNumber.value,
      ...(editId && { id: editId })
    }

    const validation = validate(ADD_CANDIDATE_RULES, params)

    if (ifObjectExist(validation)) {
      addLoader.show()

      dispatch(
        addCandidate({
          params,
          onSuccess: (success: any) => () => {
            const { message } = success
            addLoader.hide()
            modalCloseHandler()
            getCandidateApiHandler(candidatesCurrentPages)
            setEditId('')
            showToast(message, 'success')
          },
          onError: (error: any) => () => {
            const { error_message } = error

            showToast(error_message, 'error')
            addLoader.hide()
          },
        })
      )
    } else {

      showToast(getValidateError(validation))
    }
  };


  const normalizedTableData = (data: any) => {
    return data.map((el: any) => {
      const { first_name, email, last_name, mobile_number } = el

      return {
        "First Name": capitalizeFirstLetter(first_name),
        "Last Name": capitalizeFirstLetter(last_name),
        Email: email,
        "Mobile Number": mobile_number,
        '':
          <MenuBar
            menuData={MENU}
            onClick={(item) => {
              if (item?.id === MENU[0].id) {
                const { first_name, email, last_name, mobile_number, id } = el
                setEditId(id)
                firstName.set(first_name);
                lastName.set(last_name)
                mobileNumber.set(mobile_number)
                mail.set(email)
                addCandidateModel.show()

              }
            }}
          />

      };
    })

  }

  function modalCloseHandler() {
    addCandidateModel.hide();
    firstName.set('');
    lastName.set('')
    mobileNumber.set('')
    mail.set('')
    setEditId('')
  }

  return (
    <>
      <div className={'screen-padding'}>
        <ScreenHeading
          text={'Candidates'}
          children={
            <div className={'d-flex justify-content-end'}>
              <div className={'btn-wrapper'}>
                <Button
                  block
                  text={'Add'}
                  onClick={addCandidateModel.show}
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
          candidates?.length > 0
          &&
          <CommonTable
            isPagination={candidatesNumOfPages > 1}
            title={'Candidate'}
            displayDataSet={normalizedTableData(candidates)}
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
          candidates?.length <= 0 &&
          <div className={'no-data-container'}>
            <NoDataFound />
          </div>
        }
      </div >

      <Modal
        loading={addLoader.loader}
        title={`${editId ? "Edit" : "Add"}`}
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
              heading={"Last Name"}
              value={lastName.value}
              onChange={lastName.onChange}
            />
          </div>

          <div className='col-sm-6'>
            <Input
              heading={"Mobile Number"}
              type={'number'}
              value={mobileNumber.value}
              maxLength={10}
              onChange={mobileNumber.onChange}
            />
          </div>
          <div className='col-sm-6'>
            <Input
              heading={"Email"}
              value={mail.value}
              onChange={mail.onChange}
            />
          </div>
        </div>
      </Modal >
    </>
  )
}

export { Candidates };
