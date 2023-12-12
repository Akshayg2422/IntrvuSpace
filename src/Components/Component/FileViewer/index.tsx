import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import { FileViewProps } from './interfaces'
import { translate } from '@I18n';
import { getPhoto } from '@Utils';
import{Image}from '@Components'

function FileViewer({ onChange, onSelect,icons,height='600px' ,width='100%' ,selectedFileUrl,title,className}: FileViewProps) {
 

  return (
    <div className={` d-flex justify-content-center ${className} `}>
      <iframe
          title={title}
          src={getPhoto(selectedFileUrl)}
          width={width}
          height={height}
        />
      </div>
)
  }


export { FileViewer };

/* we have to use like this */

// <FileViewer
// selectedFileUrl={'https://www.arvindguptatoys.com/arvindgupta/orwellanimalfarm.pdf'} />

