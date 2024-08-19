import axiosInstance from './axiosInstance.ts';

import {TAlertStatusDTO} from 'types/dtos/alert.ts';

const getAlertStatus = async (): Promise<TAlertStatusDTO> => {
  const {data} = await axiosInstance.get(`/api/v1/users/alarms`);

  return data.result;
};

const postEventAlertStatus = async (): Promise<TAlertStatusDTO> => {
  const {data} = await axiosInstance.post('/api/v1/users/alarms/event');

  return data.result;
};

const postPushAlertStatus = async (): Promise<TAlertStatusDTO> => {
  const {data} = await axiosInstance.post('/api/v1/users/alarms/push');

  return data.result;
};

export {getAlertStatus, postEventAlertStatus, postPushAlertStatus};
