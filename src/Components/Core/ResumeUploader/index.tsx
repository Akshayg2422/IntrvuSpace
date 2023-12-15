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

function ResumeUploader({ onSelect, placeholder, title, buttonText = 'Submit', loading, onClick }: ResumeUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileUpload, setFileUpload] = useState<string | null>(null);
    const [fileExtension, setFileExtension] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);



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
                    setFileName(file.name);
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
                    <div>
                        <div className={'screen-heading title'}>{title}</div>
                    </div><div className={`resume-picker-container card-border pointer`} onClick={handleRefClick}>
                        <Image className={'mb-3'} src={icons.upload} height={35} width={35} />
                        <div className={' resume-picker-placeholder'}>
                            {placeholder}
                        </div>
                    </div>
                </>

            ) : (
                <div>
                    <div className={'delete-icon'}>
                        <Image
                            className={'pointer'}
                            src={icons.delete}
                            color='red'
                            variant={'default'}
                            height={28}
                            width={28}
                            style={{
                                objectFit: 'cover',
                            }}
                            onClick={handleDelete}
                        />
                    </div>
                    <div className={`resume-picker-container card-border pointer`} onClick={handleRefClick}>
                        <Image className={'mb-3'} src={getFileIcon(fileExtension as string)} height={70} width={60} />
                        <div className={'file-name'}>
                            {fileName}
                        </div>
                    </div>
                    {onClick &&
                        <div className={'bottom-btn-container'}>
                            <div className={'bottom-btn'}>
                                <Button loading={loading} block text={buttonText} onClick={onClick} />
                            </div>
                        </div>
                    }
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
