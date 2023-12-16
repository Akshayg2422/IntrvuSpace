import { icons } from '@Assets';
import { Button, CommonTable, ImagePicker, Input, MenuBar, Modal, NoDataFound, ResumeUploader, ScreenHeading, Spinner, showToast, Image } from '@Components';
import { useInput, useLoader, useModal } from '@Hooks';
import { addCandidate, getCandidates, uploadResume } from '@Redux';
import { ADD_CANDIDATE_RULES, INITIAL_PAGE, capitalizeFirstLetter, cleanBase64, getPhoto, getValidateError, ifObjectExist, paginationHandler, validate } from '@Utils';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { CandidateModal } from '@Modules';


function Candidates() {

  const dispatch = useDispatch()

  const {
    candidates,
    candidatesNumOfPages,
    candidatesCurrentPages,
  } = useSelector((state: any) => state.AdminReducer)


  const MENU = [{ id: '0', name: "Edit", icon: icons.edit }]
  const RESUMEMENU = [{ id: '0', name: "Pick From Resume" }]

  const loader = useLoader(true)


  /**
   * add,Edit candidate state
   */
  const addCandidateModel = useModal(false);

  const [editId, setEditId] = useState<any>()
  const addLoader = useLoader(false);
  const resumeLoader = useLoader(false)
  const firstName = useInput("");
  const lastName = useInput("");
  const mail = useInput("");
  const mobileNumber = useInput("");
  const inFocus = useRef<any>()
  const [selectedImage, setSelectedImage] = useState<any>({})
  const pickResumeModal = useModal(false)
  const [selectedResume, setSelectedResume] = useState<string | null>(null);

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

  const base64Photo = selectedImage?.base64 ? selectedImage?.base64 : "";
  const cleanedBase64Photo = cleanBase64(base64Photo)

  const addCandidateApiHandler = () => {
    const params = {
      ...(cleanedBase64Photo && { photo: cleanedBase64Photo }),
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

  const prefillDataFromResume = (success) => {
    const { message, details } = success;
    const { first_name, last_name, email, mobile } = details;
    setSelectedResume(null);
    firstName.set(first_name);
    lastName.set(last_name);
    mail.set(email);
    mobileNumber.set(mobile);
    showToast(message, 'success');
    resumeLoader.hide();
    pickResumeModal.hide();
  };

  const uploadResumeHandler = () => {
    const params = {
      attachment: selectedResume
    }
    resumeLoader.show()
    dispatch(
      uploadResume({
        params,
        onSuccess: (success: any) => () => {
          prefillDataFromResume(success)
        },
        onError: (error: any) => () => {
          const { error_message } = error
          showToast(error_message, 'error')
          resumeLoader.hide()
          pickResumeModal.hide()
        }
      })
    )
  }


  const normalizedTableData = (data: any) => {
    return data.map((el: any) => {

      const { id, first_name, email, last_name, mobile_number, candidate_photo } = el

      return {
        "First Name": (
          <div className={"d-flex align-items-center"}>
            <div>
              {candidate_photo ?
                <PhotoProvider>
                  <div className={"pointer"}>
                    <PhotoView src={getPhoto(candidate_photo)}>
                      <Image
                        src={getPhoto(candidate_photo)}
                        height={50}
                        width={50}
                        style={{
                          objectFit: 'cover',
                          overflow: 'hidden',
                          padding: '1px',
                          borderRadius: '30px',
                          width: "45px",
                          height: "45px",
                        }}
                      />
                    </PhotoView>
                  </div>
                </PhotoProvider>
                :
                <div style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "30px",
                  backgroundColor: "#fbfcfa",
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                }}>
                  <Image
                    src={icons.profile}
                    height={20}
                    width={20}
                    style={{
                      objectFit: 'contain'
                    }}
                  />
                </div>

              }
            </div>
            <div className={"th-bold ml-3"}>
              {capitalizeFirstLetter(first_name)}
            </div>
          </div>
        ),
        "Last Name": capitalizeFirstLetter(last_name),
        Email: email,
        "Mobile Number": mobile_number,
        '':
          <MenuBar
            menuData={MENU}
            onClick={(item) => {
              if (item?.id === MENU[0].id) {
                setEditId(id)
                setSelectedImage(candidate_photo)
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
    setSelectedImage({})
  }

  const handleResumeSelect = (resumeData: string) => {
    setSelectedResume(resumeData)
  }

  const closeResumeModal = () => {
    pickResumeModal.hide()
    setSelectedResume(null)
  }

  const resetStateValues = () => {
    firstName.set('');
    lastName.set('');
    mobileNumber.set('');
    mail.set('');
    setSelectedImage({});
  };



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

      <CandidateModal
        loading={addLoader.loader}
        title={`${editId ? "Edit" : "Add Candidate"}`}
        isOpen={addCandidateModel.visible}
        onClose={modalCloseHandler}
        onClick={addCandidateApiHandler}
        onClickOutline={resetStateValues}
        menubar={
          <MenuBar
            menuData={RESUMEMENU}
            onClick={pickResumeModal.show}
          />
        }
        imagePicker={
          <ImagePicker
            placeholder={'Photo'}
            defaultPhotos={[selectedImage]}
            onSelect={setSelectedImage}
          />
        }
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
      </CandidateModal >
      <Modal
        isOpen={pickResumeModal.visible}
        loading={resumeLoader.loader}
        onClose={closeResumeModal}
      >
        <div className={'d-flex justify-content-center'}>
          <ResumeUploader
            loading={resumeLoader.loader}
            title={'Upload File'}
            placeholder={'Click to upload file'}
            onSelect={handleResumeSelect}
            onClick={uploadResumeHandler} />
        </div>

      </Modal>
    </>
  )
}

export { Candidates };
