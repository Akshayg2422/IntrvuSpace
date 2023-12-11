import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import { FileUpViwerProps } from './interfaces'
import { translate } from '@I18n';
import { getPhoto } from '@Utils';
import{Image}from '@Components'

function FileViewer({ onChange, onSelect,icons,height,width ,selectedFileUrl}: FileUpViwerProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(selectedFileUrl);

  const openFileInNewTab = () => {
    if (fileUrl) {

       window.open(getPhoto(fileUrl), '_blank');
    }
  };
  return (
    <div >
      <div  onClick={()=>openFileInNewTab()} >
        <Image src={icons} height={height} width={width} />
      </div>
    </div>
  );
}

export { FileViewer };

/* this is type we use the fileViewer */

{/* <FileViewer
icons={icons.document} height={70} width={70} selectedFileUrl={each?.attachment_file} /> */}