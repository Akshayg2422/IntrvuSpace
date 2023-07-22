import React, { Component, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createSector, getStartChat } from '@Redux';
import { useInput, useModal } from '@Hooks';
import { translate } from "@I18n";
import { Button, ImagePicker, Input, Modal } from '@Components';


function Sector() {
  const dispatch = useDispatch()

  const addSector = useModal(false);

  const name = useInput("");
  const description = useInput("");
  const [image, setImage] = useState("");
  const [photo, setPhoto] = useState<any>();



  const addSectorDetails = () => {
    const params = {
      name: name.value,
      description: description.value,
      photo: photo
    }
    
    dispatch(
      createSector({
            params,
            onSuccess: (success: any) => () => {
              addSector.hide()
              description.set('')
              name.set('')
              setPhoto('')
            },
            onError: (error: string) => () => {
            },
        })
    );
  };


  return (
    <>
      <div className="row justify-content-end m-2 mb-3">
        <Button
          className={'text-white shadow-none'}
          size={'sm'}
          text={"Add Sector"}
          onClick={() => {
            addSector.show()
          }}
        />
      </div>
      < Modal size={'lg'} title={"Add Sector"} isOpen={addSector.visible} onClose={addSector.hide} >
        <div className="col-md-9 col-lg-5">
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
                // onSelectImagePickers={(el) => {
                //   let array: any = []

                //   for (let i = 0; i <= el.length; i++) {
                //     let eventPickers = el[i]?.base64?.toString().replace(/^data:(.*,)?/, "")
                //     if (eventPickers !== undefined) {
                //       array.push(eventPickers)
                //     }

                //   }
                //   setPhoto(array)
                // }}
              />
            </div>
          </div>
        </div>
        <div className="col text-right ">
          <Button size={'md'}
            // loading={GroupSubmitLoader.loader}
            text={"Submit"}
            onClick={() => addSectorDetails()}
          />
        </div>
      </Modal >
    </>
  )
}

export { Sector }
