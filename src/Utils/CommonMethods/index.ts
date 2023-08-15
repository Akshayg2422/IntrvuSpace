import {
  getPhoto,
} from "@Utils";

export function ifObjectExist(value: object) {
  let is_valid = true;

  if (Object.keys(value).length !== 0) {
    is_valid = false;
  }
  return is_valid;
}

export const filteredName = (value: any, length) => {
  if (value?.length > length) {
    return value.substring(0, length).trim() + '...';
  }
  else {
    return value
  }
}


export function changeDropDownDataKey(arr: any) {
  if (arr && arr.length > 0) {
    return arr.map((elm: any) => ({ id: elm.id, text: elm.name }));
  }
}

export function convertToUpperCase(data: any) {
  let toUpperCase = data && data.charAt(0).toUpperCase() + data.slice(1);
  return toUpperCase
}

export function getStatusFromCode(dashboardDetails: any, status: string) {
  const statusCodes: any = {};
  dashboardDetails && dashboardDetails?.ticket_status && dashboardDetails?.ticket_status.length > 0 &&
    dashboardDetails?.ticket_status.forEach((pair: any) => {
      const code = pair[0];
      const description = pair[1];
      statusCodes[code] = description;
    });

  return statusCodes[status];

}


export const getObjectFromArrayByKey = (array: any, key: string, value: any) => {
  return array.find(item => {
    return item[key] === value;
  });
};

export function paginationHandler(type: 'next' | 'prev' | 'current', position: number) {
  let page = type === 'next' ? position + 1 : type === 'prev' ? position - 1 : position;
  return page;
}

export function getArrayFromArrayOfObject(data: Array<any>, key: string) {
  let modifiedArr: any = [];
  if (data && data.length > 0) {
    data.forEach((el: any) => { modifiedArr = [...modifiedArr, el[key]]; });
  }
  return modifiedArr;
}

export function capitalizeFirstLetter(string: any) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function stringSlice(string: any, slice: number = 3) {
  return string.slice(0, slice)
}

export function stringSlices(string: any, slice: number = 20) {
  return string.slice(0, slice)
}

export function stringToUpperCase(string: any) {
  return string.toUpperCase();
}

export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;

  const platform = navigator.platform;
  const regex = /\(([^)]+)\)/;
  const match = regex.exec(userAgent);
  let brand
  let model
  if (match && match.length > 1) {
    const deviceInfo = match[1].split(';');
    brand = deviceInfo[0].trim();
    model = deviceInfo[1].trim();
  }
  return { brand, model, platform }
}


export async function imagePickerConvertBase64(array) {
  const promises = array.map(async (each) => {
    let photo = await getPhoto(each.photo);
    const base64 = await fetch(photo)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((res) => {
          reader.onloadend = () => {
            res(reader.result);
          }
        })
      })
    return {
      ...each,
      base64: base64
    };

  });

  return Promise.all(promises);
}



export function getDropDownCompanyDisplayData(data: any, key: 'name' | 'title' = 'name') {
  return data && data?.map((item: any) => {
    return {
      ...item,
      text: item[key]
    }
  })
}


export const combineBase64Strings = (stringsArray) => {
  const decodedArray = stringsArray.map((base64String) => {
    try {
      const byteCharacters = atob(base64String);
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }
      return byteArray;
    } catch (error) {
      console.error('Error decoding base64 string:', error);
      return null;
    }
  });

  console.log('Decoded Array:', decodedArray); // Log the decoded arrays to check

  const validDecodedArray = decodedArray.filter((item) => item !== null);

  const combinedArray: any = new Uint8Array(
    validDecodedArray.reduce((acc, curr) => acc.concat(Array.from(curr)), [])
  );

  const combinedBase64 = btoa(String.fromCharCode.apply(null, combinedArray));

  return combinedBase64;
};

export async function checkMicrophoneState() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioTrack = stream.getAudioTracks()[0];
    return audioTrack.enabled;
  } catch (error) {
    console.error('Error accessing microphone:', error);
    return false; // Microphone is not accessible
  }
}


export function getShortName(fullName: string) {
  const names = fullName.split(' ');

  if (names.length === 1) {
    return names[0].substring(0, 2).toUpperCase();
  }

  const firstNameInitial = names[0][0].toUpperCase();
  const lastNameInitial = names[names.length - 1][0].toUpperCase();
  return `${firstNameInitial}${lastNameInitial}`;
}

