import {TMoimSearchResultDTO} from 'types/dtos/moim.ts';
import axiosInstance from './axiosInstance.ts';
import {MOIM_REQUEST_TYPE} from '../types/enums';

const getSearchMoimList = async (
  cursor: number,
  moimRequestType: MOIM_REQUEST_TYPE[] | null,
  name: string,
): Promise<TMoimSearchResultDTO> => {
  let url = `/api/v1/moims?name=${name}&cursor=${cursor}&take=5`;

  if (moimRequestType) {
    url += `&moimRequestType=${moimRequestType}`;
  }

  const {data} = await axiosInstance.get(url);

  return data.result;
};

export {getSearchMoimList};
