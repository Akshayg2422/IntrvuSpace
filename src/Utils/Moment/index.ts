import moment from 'moment';
export const getDates = (date?: string) => date ? new Date(date) : new Date();

export const DD_MMMM_YYYY = 'DD MMMM YYYY';
export const HH_MM_A = 'hh:mm A';
export const HH_MM = 'HH:mm';
export const HH_MM_A_DD_MMMM_YYYY = 'hh:mm A, DD MMMM YYYY';
export const YYYY_MM_DD = 'YYYY-MM-DD';
export const YYYY_MM_DD_HH_MM_SS = 'YYYY-MM-DD HH:mm:ss';
export const HDD_MMMM_YYYY_HH_MM_A = 'DD MMMM YYYY , hh:mm A';


export const getMomentObjFromServer = (date: Date) => {
  return moment(date);
};

export const getDisplayDateFromMoment = (momentObj: any) => {
  return momentObj.format(DD_MMMM_YYYY);
};

export const getDisplayTimeFromMoment = (momentObj: any) => {
  return momentObj.format(HH_MM_A);
};

export const getDisplayTimeWithoutSuffixFromMoment = (momentObj: any) => {
  return momentObj.format(HH_MM);
};

export const getDisplayDateTimeFromMoment = (momentObj: any) => {
  return momentObj.format(HH_MM_A_DD_MMMM_YYYY);
};

export const getServerDateFromMoment = (momentObj: any) => {
  return momentObj.format(YYYY_MM_DD);
};

export const getServerTimeFromMoment = (momentObj: any) => {
  return momentObj.format(YYYY_MM_DD_HH_MM_SS);
};

export const getDisplayDateFromMomentByType = (
  type: string,
  momentObj: any,
) => {
  return momentObj.format(type);
};

export const getDisplayTimeDateMonthYearTime = (momentObj: any) => {
  return momentObj.format("D MMM YYYY, h:mm A")

}



