import React, { useEffect, useState } from "react";


import { FilePickerProps } from './interfaces'
import { useDropzone } from 'react-dropzone'
import { icons } from "@Assets";


const FilePicker = ({ }: FilePickerProps) => {

    const [files, setFiles] = useState<any>([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {



            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        },
        maxFiles: 3
    });

    const thumbs = files.map((file: any) => (

        <img
            className="bg-red"
            src={file.preview}
            alt="slas"
            style={{
                height: '100px',
                width: '100px',
                borderRadius: 10,
                objectFit: 'contain',
            }}
        />


    ));



    console.log(JSON.stringify(files));

    

    return (
        <>
            <div {...getRootProps({ className: 'dropzone bg-primary align-items-center justify-content-center' })} style={{
                height: '100px',
                width: '100px',
                borderRadius: 10
            }}>
                <input {...getInputProps()} />
                <img src={icons.plus} alt="Plus" style={{ objectFit: "contain", height: '60px', width: '60px' }} />


            </div>

            <div>
                {
                    thumbs
                }
            </div>
        </>

    );
};

export { FilePicker };