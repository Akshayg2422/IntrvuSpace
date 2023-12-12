import React, { useRef, useState } from 'react';
import { ResumeUploaderProps } from './interfaces';
import { Button, showToast, Image } from '@Components';
import { icons } from '@Assets';

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

function ResumeUploader({ onSelect }: ResumeUploaderProps) {
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
                <Button
                    className={'text-primary'}
                    size={'lg'}
                    variant={'icon-rounded'}
                    icon={icons.addIcon}
                    onClick={handleRefClick}
                    height={80}
                    width={80}
                />
            ) : (
                <div>
                    <div style={{ position: 'absolute', left: '14%', zIndex: 999 }}>
                        <Image
                            className={'pointer'}
                            src={icons.delete}
                            color='red'
                            variant={'default'}
                            height={'3%'}
                            width={'3%'}
                            style={{
                                objectFit: 'cover',
                            }}
                            onClick={handleDelete}
                        />
                    </div>
                    <div>
                        <Button
                            className={''}
                            icon={getFileIcon(fileExtension as string)}
                            variant={'icon-rounded'}
                            height={80}
                            width={80}
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
