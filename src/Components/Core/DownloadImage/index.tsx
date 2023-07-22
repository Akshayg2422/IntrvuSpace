import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { DownloadImageProps } from './interfaces';
import { Button } from '@Components';

function ImageDownloadButton({ Url, size = 'sm', color = 'primary', title }: DownloadImageProps) {


  const handleDownload = async () => {
    try {
      if (Array.isArray(Url)) {
        const requests = Url.map((url) => axios.get(url, { responseType: 'blob' }));
        const responses = await Promise.all(requests);
        responses.forEach((response) => saveAs(response.data, title));

        // console.log('response=======>>>',responses)

      } else {
        const response = await axios.get(Url, { responseType: 'blob' });
        saveAs(response.data, title);
      }
    } catch (error) {
      // console.error('Error=====>>', error);
    }
  };

  return (
    <Button onClick={handleDownload} className="fa fa-download mt-1" size={'sm'} >
      {Array.isArray(Url) ? 'All' : 'Image'}
    </Button>
  );
}

export { ImageDownloadButton };
