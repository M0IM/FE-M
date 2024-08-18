import axiosInstance from './axiosInstance.ts';

import {
  TGetMyActiveMoimResponse,
  TMoimParticipantList,
} from 'types/dtos/moim.ts';

const getMyActiveMoim = async (
  cursor: number,
): Promise<TGetMyActiveMoimResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moims/me?cursor=${cursor}&take=6`,
  );

  return data.result;
};

const getDetailMoimParticipantsList = async ({
  moimId,
  planId,
  page,
}: {
  moimId: number;
  planId: number;
  page: number;
}): Promise<TMoimParticipantList[]> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moim/${moimId}/plan/${planId}/participants?page=${page}&size=5`,
  );

  return data.result.planParticipantList;
};

export {getMyActiveMoim, getDetailMoimParticipantsList};
