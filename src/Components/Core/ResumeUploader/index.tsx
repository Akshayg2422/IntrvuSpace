import React, { useRef, useState } from 'react';
import { ResumeUploaderProps } from './interfaces';
import { Button, showToast, Image } from '@Components';
import { icons } from '@Assets';
import './index.css';

function getFileIcon(fileExtension: string) {
    switch (fileExtension) {
        case '.pdf':
            return icons.pdfIcon;
        case '.doc':
            return icons.docIcon;
        case '.docx':
            return icons.docxIcon;
        default:
            return null;
    }
}

function ResumeUploader({ onSelect, placeholder }: ResumeUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileUpload, setFileUpload] = useState<string | null>(null);
    const [fileExtension, setFileExtension] = useState<string | null>(null);

    const handleRefClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const allowedExtensions = ['.doc', '.docx', '.pdf'];
            const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                showToast('Invalid file type. Please upload a DOC, DOCX, or PDF file.', 'error');
                return;
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                if (onSelect && e.target) {
                    onSelect(e.target.result);
                    setFileUpload(e.target.result as string);
                    setFileExtension(fileExtension);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const handleDelete = () => {
        setFileUpload(null);
        setFileExtension(null);

        if (fileInputRef.current?.form) {
            fileInputRef.current.form.reset();
        }
    };

    return (
        <div>
            {!fileUpload ? (

                <>
                    <div className={`resume-picker-container border pointer`} onClick={handleRefClick}>
                        <div className={'resume-picker-placeholder'}>{placeholder}</div>
                    </div>
                </>
            ) : (
                <div>
                    <div className={'position-absolute d-flex pl-6'}>
                        <Image
                            className={'pointer'}
                            src={icons.delete}
                            color='red'
                            variant={'default'}
                            height={'5%'}
                            width={'5%'}
                            style={{
                                objectFit: 'cover',
                            }}
                            onClick={handleDelete}
                        />
                    </div>


                    <div className={`resume-picker-container card-border overflow-hidden`}>
                        <Image
                            variant={'default'}
                            src={getFileIcon(fileExtension as string)}
                            height={'100%'}
                            width={'100%'}
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </div>
            )}
            <form>
                <input
                    id="file-input"
                    type={'file'}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    accept=".doc, .docx, .pdf"
                    onChange={handleChange}
                />
            </form>
        </div>
    );
}

export { ResumeUploader };
