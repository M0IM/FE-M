import axiosInstance from './axiosInstance.ts';

import {TAlarmResponse, TAlertStatusDTO} from 'types/dtos/alert.ts';

const getAlertStatus = async (): Promise<TAlertStatusDTO> => {
  const {data} = await axiosInstance.get(`/api/v1/users/alarms/status`);

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

const getAlertList = async ({
  cursor,
  take,
}: {
  cursor: number;
  take: number;
}): Promise<TAlarmResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/users/alarms?cursor=${cursor}&take=${take}`,
  );

  console.log(data.result);

  return data.result;
};

const deleteAllAlertList = async (): Promise<any> => {
  const {data} = await axiosInstance.delete('/api/v1/users/alarms');

  return data.result;
};

export {
  getAlertStatus,
  postEventAlertStatus,
  postPushAlertStatus,
  getAlertList,
  deleteAllAlertList,
};
