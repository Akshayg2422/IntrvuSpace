import { Button, Image, Modal, showToast } from "@Components";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Alert } from "reactstrap";
import "./FileUploader.css"; // Import your CSS file for styling

interface fileUploadProps {
  onFileUpload?: any;
  isImageUpload?: boolean;
  onClick?: (val) => void;
}

const FileUploader = ({
  onFileUpload,
  isImageUpload = false,
  onClick,
}: fileUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<any>();

  const acceptedFormats = [
    "image/svg+xml",
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/bmp",
    "image/gif",
    "image/webp",
    "image/tiff",
    "image/vnd.microsoft.icon",
    "image/x-icon",
    "image/vnd.djvu",
  ];

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach((file: any) => {
        if (isImageUpload && !acceptedFormats.includes(file.type)) {
          showToast(`Unsupported image format! ${file.type}`, "error");
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            // Use the file data URL as a unique identifier
            const fileIdentifier = reader.result;
            if (!uploadedFiles.includes(fileIdentifier)) {
              setUploadedFiles([...uploadedFiles, fileIdentifier]);
              onFileUpload(file);
            } else {
              showToast(`${file.name} is already uploaded`, "info");
            }
          };
          reader.readAsDataURL(file);
        }
      });
    },
    [onFileUpload, uploadedFiles]
  );

  // delete file functionality

  const deleteFile = (fileIdentifier: any) => {
    setUploadedFiles(
      uploadedFiles.filter((file: any) => file !== fileIdentifier)
    );
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      multiple: true,
    });


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <div
            {...getRootProps()}
            className={`file-uploader text-center ${isDragActive ? "drag-active" : ""
              }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>{"Drop files here..."}</p>
            ) : isDragReject ? (
              <Alert color="danger">{"Unsupported file format!"}</Alert>
            ) : (
              <p className="mt-3">
                {"Drag & drop files or click to select them."}
              </p>
            )}
          </div>
        </div>
      </div>
      {uploadedFiles && uploadedFiles.length > 0 && (
        <div className="mt-4">
          <p className="text-white">{"Uploaded Files"}</p>
          <div className="d-flex flex-wrap">
            {uploadedFiles.map((fileIdentifier: any, index: any) => {
              const isImage = fileIdentifier?.toString()?.search(":image");

              return (
                <div key={index} className="d-flex pl-2">
                  <div>
                    <a
                      // href={`${isCsv > 0 && fileIdentifier}`}
                      target={"_blank"}
                      rel="noopener noreferrer"
                      className="bg-gradient-primary d-flex"
                      style={{
                        borderRadius: 5,
                        width: "50px",
                        height: "50px",
                        padding: 0.5,
                      }}
                      onClick={() => {
                        if (isImage > 0) {
                          setIsModalOpen(true);
                          setImageFile(fileIdentifier);
                        }
                      }}
                    >
                      {fileIdentifier.includes("image") ? (
                        <img
                          src={fileIdentifier}
                          alt={`Uploaded ${index + 1}`}
                          width={45}
                          height={45}
                        />
                      ) : (
                        <i className="bi bi-file-earmark-text fa-2x mt--1 ml-1 text-white"></i>
                      )}
                    </a>
                  </div>

                  <div className="">
                    <div
                      className="bg-white mt--1 ml--2"
                      style={{ height: 15, width: 15, borderRadius: 10 }}
                    />
                    <div
                      className="ml--2 deleteIcon"
                      style={{ marginTop: -20 }}
                    >
                      <i
                        className="bi bi-dash-circle-fill text-red "
                        onClick={() => deleteFile(fileIdentifier)}
                      ></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Modal
        title="Image"
        isOpen={isModalOpen}
        size="lg"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="d-flex justify-content-center h-50vh">
          <img
            className="img-thumbnail"
            src={imageFile}
            style={{
              width: "500px",
              height: "350px",
              objectFit: "contain",
            }}
          />
        </div>
      </Modal>
      {uploadedFiles && uploadedFiles.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <Button
            text={"Submit"}
            onClick={() => {
              if (onClick) {
                onClick(uploadedFiles);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export { FileUploader };

// import React, { useState, useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { Alert } from 'reactstrap';
// import { Button, Image, Modal, showToast } from '@Components';

// import './FileUploader.css'; // Import your CSS file for styling

// interface FileUploadProps {
//   onFileUpload?: (file: File) => void;
//   isImageUpload?: boolean;
//   onClick?: (uploadedFiles: File[]) => void;
// }

// const FileUploader: React.FC<FileUploadProps> = ({
//   onFileUpload,
//   isImageUpload = false,
//   onClick,
// }: FileUploadProps) => {
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [imageFile, setImageFile] = useState<string | undefined>();

//   const acceptedFormats = [
//     'image/svg+xml',
//     'image/png',
//     'image/jpg',
//     'image/jpeg',
//     'image/bmp',
//     'image/gif',
//     'image/webp',
//     'image/tiff',
//     'image/vnd.microsoft.icon',
//     'image/x-icon',
//     'image/vnd.djvu',
//   ];

//   const onDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       acceptedFiles.forEach((file: any) => {
//         if (isImageUpload && !acceptedFormats.includes(file.type)) {
//           showToast(`Unsupported image format! ${file.type}`, 'error');
//         } else {
//           const reader = new FileReader();
//           reader.onload = () => {
//             const fileIdentifier: any = reader.result;
//             if (!uploadedFiles.includes(fileIdentifier)) {
//               setUploadedFiles([...uploadedFiles, fileIdentifier]);
//               onFileUpload && onFileUpload(file);
//             } else {
//               showToast(`${file.name} is already uploaded`, 'info');
//             }
//           };
//           reader.readAsDataURL(file);
//         }
//       });
//     },
//     [onFileUpload, uploadedFiles]
//   );

// //   const onDrop = useCallback(
//     //         (acceptedFiles: any) => {
//     //             acceptedFiles.forEach((file: any) => {

//     //                 if (isImageUpload && !acceptedFormats.includes(file.type)) {
//     //                     showToast(`Unsupported image format! ${file.type}`, 'error');
//     //                 }
//     //                 else {
//     //                     const reader = new FileReader();
//     //                     reader.onload = () => {
//     //                         // Use the file data URL as a unique identifier
//     //                         const fileIdentifier = reader.result;
//     //                         if (!uploadedFiles.includes(fileIdentifier)) {
//     //                             setUploadedFiles([...uploadedFiles, fileIdentifier]);
//     //                             onFileUpload(file);
//     //                         }
//     //                         else {
//     //                             showToast(`${file.name} is already uploaded`, "info");
//     //                         }
//     //                     };
//     //                     reader.readAsDataURL(file);
//     //                 }
//     //             });
//     //         },
//     //         [onFileUpload, uploadedFiles]
//     //     );

//   const deleteFile = (file: File) => {
//     setUploadedFiles(uploadedFiles.filter((uploadedFile) => uploadedFile !== file));
//   };

//   const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
//     onDrop,
//     multiple: true,
//   });

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-sm-6">
//           <div {...getRootProps()} className={`file-uploader text-center ${isDragActive ? 'drag-active' : ''}`}>
//             <input className="form-control" type="file" id="formFileMultiple" {...getInputProps()} />
//             {isDragActive ? (
//               <p>Drop files here...</p>
//             ) : isDragReject ? (
//               <Alert color="danger">Unsupported file format!</Alert>
//             ) : (
//               <p className='mt-3'>Drag &amp; drop files or click to select them.</p>
//             )}
//           </div>
//         </div>
//       </div>
//       {uploadedFiles.length > 0 && (
//         <div className="mt-4">
//           <p className="text-white">Uploaded Files</p>
//           <div className="d-flex flex-wrap">
//             {uploadedFiles.map((file: File, index: number) => (
//               <div key={index} className="d-flex pl-2">
//                 <div>
//                   <a
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-gradient-primary p-1 d-flex"
//                     style={{
//                       borderRadius: 5,
//                       width: '50px',
//                       height: '50px',
//                     }}
//                     onClick={() => {
//                       if (isImageUpload) {
//                         setIsModalOpen(true);
//                         setImageFile(URL.createObjectURL(file));
//                       }
//                     }}
//                   >
//                     {file.type.includes('image') ? (
//                       <img src={URL.createObjectURL(file)} alt={`Uploaded ${index + 1}`} width={45} height={45} />
//                     ) : (
//                       <i className="bi bi-file-earmark-text fa-2x mt--1 ml-1 text-white"></i>
//                     )}
//                   </a>
//                 </div>
//                 <div className="ml--2 mt--2 deleteIcon" style={{ height: '20px', width: '20px', borderRadius: '10px', backgroundColor:'white'}}>
//                   <i className="bi bi-trash pointer text-warning mt-2" style={{ marginLeft: '2.5px' }} onClick={() => deleteFile(file)}></i>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//       <Modal title="Image" isOpen={isModalOpen} size="lg" onClose={() => setIsModalOpen(false)}>
//         <div className="d-flex justify-content-center h-50vh">
//           <img
//             className="img-thumbnail"
//             src={imageFile}
//             style={{
//               width: '500px',
//               height: '350px',
//               objectFit: 'contain',
//             }}
//             alt="Uploaded Image"
//           />
//         </div>
//       </Modal>
//       {uploadedFiles.length > 0 && (
//         <div className="d-flex justify-content-center mt-4">
//           <Button
//             text="Submit"
//             onClick={() => {
//               if (onClick) {
//                 onClick(uploadedFiles);
//               }
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export { FileUploader };
