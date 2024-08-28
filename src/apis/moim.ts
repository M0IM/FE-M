import axiosInstance from './axiosInstance.ts';

import {
  TActiveMoimList,
  TCreateMoimParams,
  TCreateMoimResponse,
  TGetMyActiveMoimResponse,
  TMoimAllPostsPreviews,
  TMoimMembersDTO,
  TMoimParticipantList,
  TMoimSpaceInfoDTO,
  TWithdrawMoimResponse,
} from 'types/dtos/moim.ts';
import axios from 'axios';

const createMoim = async ({
  title,
  location,
  moimCategory,
  imageKeyName,
  introduceVideoKeyName,
  introduceVideoTitle,
  introduction,
}: TCreateMoimParams): Promise<TCreateMoimResponse> => {
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

// 모임 정보 불러오기
const getMoimSpaceInfo = async ({
  moimId,
}: {
  moimId: number;
}): Promise<TMoimSpaceInfoDTO> => {
  const {data} = await axiosInstance.get(`/api/v1/moims/${moimId}`);
  return data?.result;
};

// 모임 멤버 불러오기
const getMoimMembers = async ({
  moimId,
  cursor,
  take,
  search,
}: {
  moimId: number;
  cursor: number;
  take: number;
  search: string;
}): Promise<TMoimMembersDTO> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moims/${moimId}/members?cursor=${cursor}&take=${take}&search=${search}`,
  );
  return data?.result;
};

// 모임 가입 신청하기
const requestMoimJoin = async ({moimId}: {moimId: number}) => {
  const {data} = await axiosInstance.post(`/api/v1/moims/${moimId}/requests`);
  return data?.result;
};

// 모임 탈퇴하기 API
const withdrawMoim = async ({
  moimId,
  exitReason,
}: {
  moimId: number;
  exitReason: string;
}): Promise<TWithdrawMoimResponse> => {
  const {data} = await axiosInstance.post(`/api/v1/moims/withdraw`, {
    moimId,
    exitReason,
  });

  return data.result;
};

// 모임 전체 게시글 프리뷰 가져오기
const getMoimAllPostPreviews = async (): Promise<TMoimAllPostsPreviews[]> => {
  const {data} = await axiosInstance.get(`/api/v1/posts/what`);
  return data?.result;
};

// 다른 멤버가 활동중인 모임 확인 API
const getMembersActiveMoimList = async ({
  userId,
  cursor,
  take,
}: {
  userId: number;
  cursor: number;
  take: number;
}): Promise<TActiveMoimList> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moims/list/${userId}?cursor=${cursor}&take=${take}`,
  );

  return data.result;
};

export {
  getMyActiveMoim,
  getDetailMoimParticipantsList,
  postMoimScheduleParticipation,
  deleteMoimScheduleParticipation,
  createMoim,
  getMoimSpaceInfo,
  getMoimMembers,
  requestMoimJoin,
  withdrawMoim,
  getMoimAllPostPreviews,
  getMembersActiveMoimList,
};
