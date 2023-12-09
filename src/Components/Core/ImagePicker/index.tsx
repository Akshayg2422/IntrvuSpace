import React, { useEffect, useRef, useState } from 'react';
import { Image } from '@Components'
import { ImagePickerProps } from './interfaces'
import Compressor from "compressorjs";

import './index.css';
import { urlToBase64 } from '@Utils';

function ImagePicker({ defaultPhotos, variant = 'single', max = 3, onSelect }: ImagePickerProps) {

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [photos, setPhotos] = useState<any>([])



  useEffect(() => {
    if (defaultPhotos && defaultPhotos.length > 0) {
 if(defaultPhotos[0]?.base64){
  setPhotos(defaultPhotos)

 }
 else {
  urlToBase64(defaultPhotos)
  .then((result) => {
    setPhotos([{id:0,base64:result}])
  })

  .catch((error) => {
  
    console.error(error,"error catch from imagePicker  default value ");
  });

 }
    
      
    }

  }, [defaultPhotos])

  const handleFilePickerHandler = () => {
    if (fileInputRef.current)
      fileInputRef.current?.click();
  }

  const imagePickerHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

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
          <div className={`picker-container border pointer ${photos.length > 0 ? 'picker-margin-left' : ''}`} onClick={handleFilePickerHandler}>
            <div className={'picker-placeholder'}>{'Logo'}</div>
          </div>
        }
      </div>

    </div>
  )
}

export { ImagePicker }