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


export  async function imagePickerConvertBase64(array) {
  const promises = array.map(async (each) => {
    let photo = await getPhoto(each. photo);
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

