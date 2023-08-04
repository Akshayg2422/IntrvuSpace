import React, { Component, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createSector, getSectors, getStartChat } from '@Redux';
import { useInput, useLoader, useModal } from '@Hooks';
import { translate } from "@I18n";
import { Button, Card, CommonTable, Image, ImagePicker, Input, Modal } from '@Components';
import { filteredName, getPhoto } from '@Utils';


function Sector() {
  const dispatch = useDispatch()

  const addSector = useModal(false);

  const name = useInput("");
  const description = useInput("");
  const [image, setImage] = useState("");
  const addSectorLoader = useLoader(false);

  const [photo, setPhoto] = useState<any>();
  const { sectors } = useSelector((state: any) => state.DashboardReducer)


  useEffect(() => {
    getSectorDetailsApiHandler()
  }, [])

  const addSectorDetailsApiHandler = () => {
    const params = {
      name: name.value,
      description: description.value,
      photo: photo
    }
    addSectorLoader.show()

    dispatch(
      createSector({
        params,
        onSuccess: (success: any) => () => {
          addSector.hide()
          description.set('')
          name.set('')
          setPhoto('')
          addSectorLoader.hide()
          getSectorDetailsApiHandler()
        },
        onError: (error: string) => () => {
          addSectorLoader.hide()
        },
      })
    );
  };

  const getSectorDetailsApiHandler = () => {
    const params = {}
    dispatch(
      getSectors({
        params,
        onSuccess: (success: any) => () => {
        },
        onError: (error: string) => () => {
        },
      })
    );
  };

  const normalizedTableData = (data: any) => {
    return data?.map((el: any) => {
      return {
        '': <Image variant={'rounded'} src={getPhoto(el?.photo)} />,
        Name: el.name,
        description: filteredName(el?.description, 90),
      };
    });
  };

  return (
    <>
      <div className='container-fluid'>
        <div className="row justify-content-end m-2 mr--2 mb-3">
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
              displayDataSet={normalizedTableData(sectors)}
            />
          </div>
        </div>
      </div>
      < Modal size={'lg'} title={"Add Sector"} isOpen={addSector.visible} onClose={addSector.hide} >
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
          <div className=" pb-4 mt--4">
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
          </div>
        </div>
        <div className="col text-right ">
          <Button size={'md'}
            loading={addSectorLoader.loader}
            text={"Submit"}
            onClick={addSectorDetailsApiHandler}
          />
        </div>
      </Modal >
    </>
  )
}

export { Sector }
