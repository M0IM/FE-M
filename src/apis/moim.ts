import axiosInstance from './axiosInstance.ts';

import {
  TCreateMoimParams,
  TCreateMoimResponse,
  TGetMyActiveMoimResponse,
  TMoimParticipantList,
} from 'types/dtos/moim.ts';

const createMoim = async ({
  title,
  location,
  moimCategory,
  imageKeyName,
  introduceVideoKeyName,
  introduceVideoTitle,
  introduction,
}: TCreateMoimParams): Promise<TCreateMoimResponse> => {
  console.log({
    title,
    location,
    moimCategory,
    imageKeyName,
    introduceVideoKeyName,
    introduceVideoTitle,
    introduction,
  });
  const {data} = await axiosInstance.post(`/api/v1/moims`, {
    title,
    location,
    moimCategory,
    imageKeyName,
    introduceVideoKeyName,
    introduceVideoTitle,
    introduction,
  });
  return data?.result;
};

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

// 모임 일정 참여 신청하기
const postMoimScheduleParticipation = async ({
  moimId,
  planId,
}: {
  moimId: number;
  planId: number;
}) => {
  const {data} = await axiosInstance.post(
    `/api/v1/moim/${moimId}/plan/${planId}/participate`,
  );

  return data.result;
};

// 모임 일정 참여 취소하기
const deleteMoimScheduleParticipation = async ({
  moimId,
  planId,
}: {
  moimId: number;
  planId: number;
}) => {
  const {data} = await axiosInstance.delete(
    `/api/v1/moim/${moimId}/plan/${planId}/participate`,
  );

  return data.result;
};

export {
  getMyActiveMoim,
  getDetailMoimParticipantsList,
  postMoimScheduleParticipation,
  deleteMoimScheduleParticipation,
  createMoim,
};
