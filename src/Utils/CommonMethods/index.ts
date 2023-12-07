import { SERVER } from "@Services";
import { getPhoto } from "@Utils";

export function ifObjectExist(value: object) {
  let is_valid = true;

  if (Object.keys(value).length !== 0) {
    is_valid = false;
  }
  return is_valid;
}

export const filteredName = (value: any, length: number) => {
  if (value?.length > length) {
    return value.substring(0, length).trim() + "...";
  } else {
    return value;
  }
};
export const showMore = (value: any, length: number) => {
  if (value?.length > length) {
    return value.substring(0, length).trim() + "";
  } else {
    return value;
  }
};

export function changeDropDownDataKey(arr: any) {
  if (arr && arr.length > 0) {
    return arr.map((elm: any) => ({ id: elm.id, text: elm.name }));
  }
}

export function convertToUpperCase(data: any) {
  let toUpperCase = data && data.charAt(0).toUpperCase() + data.slice(1);
  return toUpperCase;
}

export function getStatusFromCode(dashboardDetails: any, status: string) {
  const statusCodes: any = {};
  dashboardDetails &&
    dashboardDetails?.ticket_status &&
    dashboardDetails?.ticket_status.length > 0 &&
    dashboardDetails?.ticket_status.forEach((pair: any) => {
      const code = pair[0];
      const description = pair[1];
      statusCodes[code] = description;
    });

  return statusCodes[status];
}

export const getObjectFromArrayByKey = (
  array: any,
  key: string,
  value: any
) => {
  return array.find((item) => {
    return item[key] === value;
  });
};

export function ifObjectKeyExist(object: any, key: string) {
  return object["key"] !== undefined
}

export function paginationHandler(
  type: "next" | "prev" | "current",
  position: number
) {
  let page =
    type === "next" ? position + 1 : type === "prev" ? position - 1 : position;
  return page;
}

export function getArrayFromArrayOfObject(data: Array<any>, key: string) {
  let modifiedArr: any = [];
  if (data && data.length > 0) {
    data.forEach((el: any) => {
      modifiedArr = [...modifiedArr, el[key]];
    });
  }
  return modifiedArr;
}

export function capitalizeFirstLetter(string: any) {
  if (string !== undefined && string !== null && string.length > 0)
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function stringSlice(string: any, slice: number = 3) {
  return string.slice(0, slice);
}

export function stringSlices(string: any, slice: number = 20) {
  return string.slice(0, slice);
}

export function stringToUpperCase(string: any) {
  return string.toUpperCase();
}

export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;

  const platform = navigator.platform;
  const regex = /\(([^)]+)\)/;
  const match = regex.exec(userAgent);
  let brand;
  let model;
  if (match && match.length > 1) {
    const deviceInfo = match[1].split(";");
    brand = deviceInfo[0].trim();
    model = deviceInfo[1].trim();
  }
  return { brand, model, platform };
};

export async function imagePickerConvertBase64(array) {
  const promises = array.map(async (each) => {
    let photo = await getPhoto(each.photo);
    const base64 = await fetch(photo)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((res) => {
          reader.onloadend = () => {
            res(reader.result);
          };
        });
      });
    return {
      ...each,
      base64: base64,
    };
  });

  return Promise.all(promises);
}



export async function urlToBase64(photo: any) {
  let fetchedPhoto = await getPhoto(photo);
  const base64 = await fetch(fetchedPhoto)
    .then((response) => response.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((res) => {
        reader.onloadend = () => {
          res(reader.result);
        };
      });
    });
  return base64
}



export function getDropDownDisplayData(data: any) {

  return data && data.length > 0 && data.map((item: any) => {
    return {
      ...item,
      text: item.name
    }
  })
}


export function getDropDownCompanyDisplayData(
  data: any,
  key: "name" | "title" | 'display_name' = "name"
) {
  if (!data || typeof data?.map !== 'function') {
    return [];
  }

  return data.map((item: any) => {
    return {
      ...item,
      text: item[key].charAt(0).toUpperCase() + item[key].slice(1),
    };
  });
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
      console.error("Error decoding base64 string:", error);
      return null;
    }
  });

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
    console.error("Error accessing microphone:", error);
    return false; // Microphone is not accessible
  }
}

export function getShortName(fullName: string) {
  fullName = fullName.trim();
  const names = fullName.split(" ");

  if (names.length === 1) {
    return names[0].substring(0, 2).toUpperCase();
  }

  const firstNameInitial = names[0][0].toUpperCase();

  const lastNameInitial = names[names.length - 1][0].toUpperCase();
  return `${firstNameInitial}${lastNameInitial}`;
}

export const hexToHue = (hexColor) => {
  // Convert hex to RGB values
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate hue angle
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let hue;

  if (max === r) {
    hue = (g - b) / (max - min);
  } else if (max === g) {
    hue = 2 + (b - r) / (max - min);
  } else {
    hue = 4 + (r - g) / (max - min);
  }

  hue *= 60;
  if (hue < 0) hue += 360;

  return hue;
};

// mic permission

export async function hasMicrophonePermission() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch (error) {
    return false;
  }
}

// Camera permission

export async function hasCameraPermission() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    return true;
  } catch (error) {
    return false;
  }
}

export async function requestVideoPermission() {
  try {
    // Request video permission
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  } catch (error: any) {
    // Handle errors, for example, if the user denies permission
    console.error('Error accessing video:', error.message);
  }
}


export const userAgent = window.navigator.userAgent.toLowerCase();

export function getOperatingSystem() {
  if (userAgent.includes("win")) {
    return "Windows";
  } else if (userAgent.includes("mac")) {
    return "MacOS";
  } else {
    return "Other";
  }
}

export function gotoPermissionSetting(permissionType?: 'microphone' | 'camera') {

  let settingsUrl = "";

  // Check if the user is using Windows
  if (navigator.userAgent.includes("Win")) {
    settingsUrl = permissionType === "microphone" ? "ms-settings:privacy-microphone" : "ms-settings:privacy-webcam";
  }
  // Check if the user is using macOS
  else if (navigator.userAgent.includes("Mac")) {
    settingsUrl =
      permissionType === "microphone"
        ? "x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone"
        : "x-apple.systempreferences:com.apple.preference.security?Privacy_Camera";
  }
  // For other operating systems, provide a message
  else {
    alert(
      `${permissionType} settings are not available on your current operating system.`
    );
    return;
  }

  window.open(settingsUrl);
}


// to convert server date and time  2023-10-05T19:10:15.604190+05:30 into  05 OCT 7:10 PM

export function formatDateTime(dateTimeString: any) {
  const options: any = {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
}

export function displayFormatDate(inputDate: any, variant: 'date' | 'time' | 'both' = 'both') {
  const date = new Date(inputDate);
  let options: any;

  if (variant === 'date') {
    options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  } else if (variant === 'time') {
    options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
  } else {
    options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
  }

  return date.toLocaleString("en-US", options).replace(",", "");
}

// bulk upload

export const downloadFile = (response) => {
  const fileUrl = response;
  fetch(getPhoto(fileUrl))
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `bulk_upload.csv`;
      link.click();
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error downloading file:", error);
    });
};

// get display time from server date-time response

export const getDisplayTime = (dateString: any) => {
  const inputDate = new Date(dateString);
  const hours = inputDate.getHours().toString().padStart(2, "0");
  const minutes = inputDate.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

// get date from server date-time response

export const getDateFromServer = (dateString: any) => {
  const inputDate = new Date(dateString);
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const day = inputDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function getBrowserInfo() {
  const userAgent: any = navigator.userAgent;

  let browserName: any;
  let browserVersion: any;

  if (userAgent.includes("Chrome")) {
    browserName = "Google Chrome";
    browserVersion = userAgent.match(/Chrome\/(\d+\.\d+)/)[1];
  } else if (userAgent.includes("Firefox")) {
    browserName = "Mozilla Firefox";
    browserVersion = userAgent.match(/Firefox\/(\d+\.\d+)/)[1];
  } else if (userAgent.includes("Edge")) {
    browserName = "Microsoft Edge";
    browserVersion = userAgent.match(/Edge\/(\d+\.\d+)/)[1];
  } else if (userAgent.includes("Safari")) {
    browserName = "Safari";
    browserVersion = userAgent.match(/Version\/(\d+\.\d+)/)[1];
  } else if (userAgent.includes("Opera")) {
    browserName = "Opera";
    browserVersion = userAgent.match(/Opera\/(\d+\.\d+)/)[1];
  } else {
    browserName = "Unknown";
    browserVersion = "N/A";
  }

  return { browserName, browserVersion };
}


export function createNewObjectWithoutNullOrNaNValues(obj: any) {
  const newObj = {};
  for (let key in obj) {
    if (obj[key] !== null && !isNaN(obj[key])) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

export function copyToClipboard(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export function capitalizeLetter(string: any) {
  if (string !== undefined && string !== null && string.length > 0)
    return string.toUpperCase();
}


export function isKeyValueExistInArray(array: any[], key: string, value: any): boolean {
  return array.some(item => item[key] === value);
}
