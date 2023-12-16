import React, { useEffect, useRef, useState } from 'react';
import { Image } from '@Components'
import { ImagePickerProps } from './interfaces'
import Compressor from "compressorjs";

import './index.css';
import { urlToBase64 } from '@Utils';

function ImagePicker({ defaultPhotos, title = 'Profile Picture', variant = 'single', max = 3, placeholder, onSelect }: ImagePickerProps) {

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [photos, setPhotos] = useState<any>([])
  console.log('came');


  useEffect(() => {

    const newArray = defaultPhotos.filter(value => Object.keys(value).length !== 0);

    console.log(JSON.stringify(newArray));


    if (newArray && newArray.length > 0) {
      urlToBase64(newArray)
        .then((result) => {
          setPhotos([{ id: 0, base64: result }])
        })
        .catch((error) => {
          console.error(error, "error catch from imagePicker  default value ");
        });
    } else {
      console.log('came');

      setPhotos(newArray)
    }

  }, [defaultPhotos])

  const handleFilePickerHandler = () => {
    if (fileInputRef.current)
      fileInputRef.current?.click();
  }

  const imagePickerHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('came');


    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      new Compressor(file, {
        quality: 0.1,
        success: (file) => {
          const reader = new FileReader();
          reader.onload = (composeEvent) => {
            const { target } = composeEvent
            if (target) {
              const id = photos.length + 1
              const base64 = target?.result;
              const currentImage = { id, file: file, base64 }
              let updatedPhotos: any = [...photos];

              if (variant === 'single') {
                updatedPhotos = [currentImage]
                setPhotos(updatedPhotos)
                if (onSelect) {
                  onSelect(currentImage)
                }
              } else {


                if (updatedPhotos.length < max) {
                  updatedPhotos = [...updatedPhotos, currentImage]
                  setPhotos(updatedPhotos)
                }

              }
            }
          };
          reader.readAsDataURL(file);

        },
      });
    }
  };


  return (
    <div>
      <div className={'title-alignment form-control-label font-weight-600'}>{title}</div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={imagePickerHandleChange}
        accept="image/*"
      />
      <div className={'d-flex flex-wrap'}>
        {photos && photos.length > 0
          && photos.map((el: any, index: number) => {
            return (
              <div className={`picker-container card-border overflow-hidden ${index === 0 ? '' : 'picker-margin-left'}`} onClick={handleFilePickerHandler}>
                <Image
                  height={'100%'}
                  width={'100%'}
                  src={photos[index]?.base64}
                  variant={'default'}
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
            )
          })
        }
        {
          photos.length <= 0 &&
          <div className={`picker-container card-border pointer ${photos.length > 0 ? 'picker-margin-left' : ''}`} onClick={handleFilePickerHandler}>
            <div className={'picker-placeholder'}>{placeholder}</div>
          </div>
        }
      </div>

    </div>
  )
}

export { ImagePicker }