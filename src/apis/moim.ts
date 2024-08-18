import axiosInstance from './axiosInstance.ts';

import {TGetMyActiveMoimResponse} from 'types/dtos/moim.ts';

const getMyActiveMoim = async (
  cursor: number,
): Promise<TGetMyActiveMoimResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moims/me?cursor=${cursor}&take=6`,
  );

  return data.result;
};

export {getMyActiveMoim};
