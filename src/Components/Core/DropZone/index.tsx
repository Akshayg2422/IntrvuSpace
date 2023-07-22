import React, { useRef, useState } from "react";
import { Image } from "@Components";
import { icons } from "@Assets";
import { DropZoneProps } from "./interfaces";
import Compressor from "compressorjs";


const Dropzone = ({
  onSelect,
  variant = "BUTTON",
  text,
  icon,
  size = "lg",
  imageVariant = 'avatar',
  imagePicker = false,
}: DropZoneProps) => {
  const fileInputRef = useRef<any>();
  const [image, setImage] = useState<any>(icon);
  const handleRefClick = () => {
    fileInputRef.current.click();
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      new Compressor(file, {
        quality: 0.7,
        success: (file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
       
            if (onSelect && e.target) {
              onSelect(e.target?.result);
              setImage(e.target?.result);
            }
          };
          reader.readAsDataURL(file);
        },
      });
    }
  };

  return (
    <>
      {variant === "BUTTON" && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleChange}
            accept="image/*"
          />
          <button onClick={handleRefClick}>{text && text}</button>
        </>
      )}
      {variant === "ICON" && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleChange}
            accept="image/*"
          />
          <div >
            <Image
              src={image || icons.addFillSquare}
              variant={imageVariant}
              onClick={handleRefClick}
              size={size}
              style={{ backgroundColor: "#e3e5e8" }}
            />
          </div>

          {imagePicker && 
          <div className="mt--4 ml-5 " >
            <Image size={'xs'} src={icons.updatedProfile}
            variant={'avatar'}
            onClick={handleRefClick} height={14} width={14}
            style={{ position: 'absolute', backgroundColor: "white", }} />
          </div>
          }

        </>
      )}
    </>
  );
};

export { Dropzone };
