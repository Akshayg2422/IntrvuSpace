import React, { Component, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addSectorCorporate, createSector, getSectorCorporate, getSectors, getStartChat } from '@Redux';
import { useInput, useLoader, useModal } from '@Hooks';
import { translate } from "@I18n";
import { Back, Button, Card, CommonTable, Image, ImagePicker, Input, Modal, showToast } from '@Components';
import { ADD_SECTOR_RULES, getPhoto, getValidateError, ifObjectExist, validate, filteredName, ADD_SECTOR_CORPORATE_RULES } from '@Utils';


function Sector() {
  const dispatch = useDispatch()

  const addSector = useModal(false);

  const name = useInput("");
  const description = useInput("");
  const addSectorLoader = useLoader(false);
  const { sectorsCorporate } = useSelector((state: any) => state.DashboardReducer)
  console.log('1111111111111111111111111111111===========', sectorsCorporate);



  useEffect(() => {
    getSectorCorporateDetailsApiHandler()
  }, [])

  const addSectorCorporateDetailsApiHandler = () => {
    const params = {
      name: name.value,
      description: description.value,
      // photo: photo
    }
    console.log('Corporate========>', params);

    const validation = validate(ADD_SECTOR_CORPORATE_RULES, params)

    if (ifObjectExist(validation)) {
      addSectorLoader.show()
      dispatch(
        addSectorCorporate({
          params,
          onSuccess: (success: any) => () => {
            addSector.hide()
            description.set('')
            name.set('')
            addSectorLoader.hide()
            getSectorCorporateDetailsApiHandler()
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

  const getSectorCorporateDetailsApiHandler = () => {
    const params = {}
    dispatch(
      getSectorCorporate({
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
      // console.log('2000000',el);
      return {
        Name: el.name,
        description: filteredName(el?.description, 90),
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
            text={"Add Sector"}
            onClick={() => {
              addSector.show()
            }}
          />
        </div>
        <div className='row px-0  mx--4'>
          <div className='col-sm-12 px-0'>
            <CommonTable
              card
              isPagination
              title={'Sectors'}
              displayDataSet={normalizedTableData(sectorsCorporate)}
            />
          </div>
        </div>
      </div>
      < Modal size={'lg'} title={"Add Sector"} isOpen={addSector.visible} onClose={() => {
        addSector.hide()
        name.set("")
        description.set("")
        // setPhoto("")
      }} >
        <div className="col-md-9">
          <div className="mt--2">
            <Input
              heading={"Name"}
              value={name.value}
              onChange={name.onChange}
            />
          </div>
          <div className="mt--2">
            <Input
              heading={"Description"}
              value={description.value}
              onChange={description.onChange}
            />
          </div>
          {/* <div className=" pb-4 mt--4">
            <div className="row">
              <ImagePicker
                icon={image}
                size='xl'
                heading={translate("common.addAttachment")!}
                noOfFileImagePickers={1}
                onSelect={(image) => {
                  let file = image.toString().replace(/^data:(.*,)?/, "")
                  setPhoto(file)
                }}
              />
            </div>
          </div> */}
        </div>
        <div className="col text-right ">
          <Button size={'md'}
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
