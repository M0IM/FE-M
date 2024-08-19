import axiosInstance from './axiosInstance.ts';

import {TAlertStatusDTO} from 'types/dtos/alert.ts';

const getAlertStatus = async (): Promise<TAlertStatusDTO> => {
  const {data} = await axiosInstance.get(`/api/v1/users/alarms`);

  return data.result;
};

export {getAlertStatus};
