import React, { Component, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addSectorCorporate, createSector, getSectorCorporate, getSectors, getStartChat } from '@Redux';
import { useInput, useLoader, useModal, useNavigation } from '@Hooks';
import { translate } from "@I18n";
import { Button, Card, CommonTable, Heading, Image, Input, MenuBar, Modal, NoRecordsFound, Spinner, showToast } from '@Components';
import { getValidateError, ifObjectExist, validate, filteredName, ADD_SECTOR_CORPORATE_RULES, paginationHandler } from '@Utils';
import { icons } from '@Assets';


function Sector() {
  const dispatch = useDispatch()
  const { goBack } = useNavigation();
  const addSector = useModal(false);
  const [editId, setEditId] = useState<any>()
  const sectorName = useInput("");
  const descriptions = useInput("");
  const addSectorLoader = useLoader(false);
  const [loading, setLoading] = useState(true)
  const { sectorsCorporate, sectorsCorporateNumOfPages, sectorsCorporateCurrentPages } = useSelector((state: any) => state.DashboardReducer)
  // console.log('sectorsCorporate===========>>>>', sectorsCorporate);
  console.log("sectorsCorporateCurrentPages===>", sectorsCorporateCurrentPages)

  const getDesignationMenu = () => [
    { id: '0', name: "Edit", icon: icons.edit },
  ]

  useEffect(() => {
    getSectorCorporateDetailsApiHandler(1)
  }, [])

  const addSectorCorporateDetailsApiHandler = () => {
    const params = {
      name: sectorName.value,
      description: descriptions.value,
      ...(editId && { id: editId })
    }
    const validation = validate(ADD_SECTOR_CORPORATE_RULES, params)

    if (ifObjectExist(validation)) {
      addSectorLoader.show()
      dispatch(
        addSectorCorporate({
          params,
          onSuccess: (success: any) => () => {
            addSector.hide()
            descriptions.set('')
            setEditId('')
            sectorName.set('')
            addSectorLoader.hide()
            getSectorCorporateDetailsApiHandler(sectorsCorporateCurrentPages)
            showToast(success.message, 'success')
          },
          onError: (error: any) => () => {
            addSectorLoader.hide()
            showToast(error.error_message, 'error')
          },
        })
      )
    } else {
      addSectorLoader.hide()
      showToast(getValidateError(validation))
    }
  };

  const getSectorCorporateDetailsApiHandler = (page_number: number) => {
    const params = {
      page_number,
    }
    // console.log('Corporate========>', params); 
    dispatch(
      getSectorCorporate({
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
    return data?.map((el: any) => {
      const { name, description } = el

      return {
        Name: el?.name,
        description: el?.description,
        // description: filteredName(el?.description, 90),

        '': ((name || description) &&
          <MenuBar menuData={getDesignationMenu()} toggleIcon={icons.more} onClick={(item) => {

            if (item?.id === '0') {
              const { name, id, description } = el

              setEditId(id)
              sectorName.set(name)
              descriptions.set(description)
              addSector.show()


            }


          }} />
        )
      };
    });
  };

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
              <span className='headingText text-secondary'>{'Manage Sector'}</span>
            </div>
          </div>
          <Button
            size={'md'}
            className={'btn btn-primary rounded-sm'}
            text={"Add Sector"}
            onClick={() => {
              addSector.show()
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

              {sectorsCorporate && sectorsCorporate?.data?.length > 0 ? (
                <CommonTable
                  card
                  isPagination={sectorsCorporateNumOfPages>1}
                  title={'Sector'}
                  displayDataSet={normalizedTableData(sectorsCorporate?.data)}
                  noOfPage={sectorsCorporateNumOfPages}
                  currentPage={sectorsCorporateCurrentPages}
                  paginationNumberClick={(currentPage) => {
    
                    getSectorCorporateDetailsApiHandler(paginationHandler("current", currentPage));
    
                  }}
                  previousClick={() => {
                    getSectorCorporateDetailsApiHandler(paginationHandler("prev", sectorsCorporateCurrentPages))
                  }
                  }
                  nextClick={() => {
                    getSectorCorporateDetailsApiHandler(paginationHandler("next", sectorsCorporateCurrentPages));
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
      < Modal size={'lg'} isOpen={addSector.visible} onClose={() => {
        addSector.hide()
        sectorName.set("")
        descriptions.set("")
        setEditId('')
      }} >
        <div className="px-md-6">
          <div className='mt--2'>  <Heading heading={`${editId ? "Edit" : "Add"} Sector`} style={{ fontSize: '25px', fontWeight: 800, }} /></div>
          <div className='mt-4'>
            <div className='row'>
              <div className="mt--2 col">
                <Input
                  heading={"Name"}
                  value={sectorName.value}
                  onChange={sectorName.onChange}
                />
              </div>
              <div className="mt--2 col">
                <Input
                  heading={"Description"}
                  value={descriptions.value}
                  onChange={descriptions.onChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-center py-5">
          <Button size={'md'}
            className={'rounded-sm px-5 btn btn-primary '}
            style={{
              borderColor: "#d8dade",
              fontSize: "15px"
            }}
            loading={addSectorLoader.loader}
            text={"Submit"}
            onClick={addSectorCorporateDetailsApiHandler}
          />
        </div>
      </Modal >
    </>
  )
}

export { Sector }