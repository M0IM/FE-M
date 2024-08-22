import axiosInstance from './axiosInstance.ts';
import {
  TCalendarMoimResponse,
  TCalendarPersonalResponse,
  TDetailMoimCalendarDTO,
  TPostDetailMoimCalendarDTO,
  TUserPlanDTO,
  TUserPlanResponse,
  TUserSchedulesCountResponse,
} from 'types/dtos/calendar.ts';

export type TCalndarProps = {
  moimId: number;
  year: number;
  month: number;
};

const getMoimCalendar = async ({
  moimId,
  year,
  month,
}: TCalndarProps): Promise<TCalendarMoimResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moim/${moimId}/calender?year=${year}&month=${month}`,
  );

  console.log(data.result.planList);

  return data.result.planList;
};

const getPersonalCalendar = async ({
  year,
  month,
}: Omit<TCalndarProps, 'moimId'>): Promise<TCalendarPersonalResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/users/calender?year=${year}&month=${month}`,
  );

  return data.result.planList;
};

export type TDetailCalendarProps = {
  moimId: number;
  planId: number;
};

const getDetailMoimCalendar = async ({
  moimId,
  planId,
}: TDetailCalendarProps): Promise<TDetailMoimCalendarDTO> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moim/${moimId}/plan/${planId}?scheduleCntLimit=5`,
  );

  return data.result;
};

const postDetailMoimCalendar = async ({
  moimId,
  title,
  date,
  startTime,
  location,
  locationDetail,
  cost,
  schedules,
}: TPostDetailMoimCalendarDTO) => {
  const {data} = await axiosInstance.post(`/api/v1/moim/${moimId}/calender`, {
    title,
    date,
    startTime,
    location,
    locationDetail,
    cost,
    schedules,
  });

  return data.result;
};

const deleteMyCalendarSchedule = async (planId: number) => {
  const {data} = await axiosInstance.delete(`/api/v1/users/calender/${planId}`);

  return data;
};

const postMyCalendarScheule = async ({
  date,
  content,
}: {
  date: Date;
  content: string;
}) => {
  const {data} = await axiosInstance.post('/api/v1/users/calender', {
    date,
    content,
  });

  return data;
};

const updateMyCalendarSchedule = async ({
  planId,
  date,
  content,
}: {
  planId: number;
  date: Date;
  content: string;
}) => {
  const {data} = await axiosInstance.put(`/api/v1/users/calender/${planId}`, {
    date,
    content,
  });

  return data;
};

const updateDetailMoimCalendar = async ({
  moimId,
  planId,
  title,
  date,
  startTime,
  location,
  locationDetail,
  cost,
  schedules,
}: TPostDetailMoimCalendarDTO) => {
  const {data} = await axiosInstance.put(
    `/api/v1/moim/${moimId}/plan/${planId}`,
    {
      title,
      date,
      startTime,
      location,
      locationDetail,
      cost,
      schedules,
    },
  );

  return data.result;
};

const deleteDetailMoimCalendar = async ({
  moimId,
  planId,
}: TDetailCalendarProps) => {
  const {data} = await axiosInstance.delete(
    `/api/v1/moim/${moimId}/plan/${planId}`,
  );

  return data.result;
};

// 특정 날 (유저 총 일정 개수) 조회
const getUserSchedulesCount = async ({
  year,
  month,
  day,
}: {
  year: number;
  month: number;
  day: number;
}): Promise<TUserSchedulesCountResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/users/user-plan-count?year=${year}&month=${month}&day=${day}`,
  );

  return data.result;
};

// 특정 날짜 (유저 참여 신청 모임 일정) 조회
const getUserTodayParticipantSchedules = async ({
  year,
  month,
  day,
  page,
}: {
  year: number;
  month: number;
  day: number;
  page: number;
}): Promise<TUserPlanDTO[]> => {
  const {data} = await axiosInstance.get(
    `/api/v1/users/user-moim-plan?year=${year}&month=${month}&day=${day}&page=${page}&size=5`,
  );

  return data.result.userPlanDTOList;
};

// 특정 날짜 (유저의 개인 일정) 조회
const getUserTodaySchedules = async ({
  year,
  month,
  day,
  page,
}: {
  year: number;
  month: number;
  day: number;
  page: number;
}): Promise<TUserPlanDTO[]> => {
  const {data} = await axiosInstance.get(
    `/api/v1/users/user-individual-plan?year=${year}&month=${month}&day=${day}&page=${page}&size=5`,
  );

  return data.result;
};

// 특정 날짜 (연,월,일): 유저의 (개인 + 모임 신청 일정) 리스트 조회
const getUserAllScheduleList = async ({
  year,
  month,
  day,
  page,
  size,
}: {
  year: number;
  month: number;
  day: number;
  page: number;
  size: number;
}): Promise<TUserPlanResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/users/user-individual-plan?year=${year}&month=${month}&day=${day}&page=${page}&size=${size}`,
  );

  return data.result;
};

export {
  getMoimCalendar,
  getPersonalCalendar,
  getDetailMoimCalendar,
  postDetailMoimCalendar,
  postMyCalendarScheule,
  deleteMyCalendarSchedule,
  updateMyCalendarSchedule,
  updateDetailMoimCalendar,
  deleteDetailMoimCalendar,
  getUserSchedulesCount,
  getUserTodayParticipantSchedules,
  getUserTodaySchedules,
  getUserAllScheduleList,
};
