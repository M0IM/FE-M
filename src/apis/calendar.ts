import axiosInstance from './axiosInstance.ts';
import {
  TCalendarMoimResponse,
  TCalendarPersonalResponse,
  TDetailMoimCalendarDTO,
  TPostDetailMoimCalendarDTO,
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
    `/api/v1/moim/calender/individual-plans?year=${year}&month=${month}`,
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
  location,
  locationDetail,
  cost,
  schedules,
}: TPostDetailMoimCalendarDTO) => {
  const {data} = await axiosInstance.post(`/api/v1/moim/${moimId}/calender`, {
    moimId,
    title,
    date,
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

export {
  getMoimCalendar,
  getPersonalCalendar,
  getDetailMoimCalendar,
  postDetailMoimCalendar,
  postMyCalendarScheule,
  deleteMyCalendarSchedule,
  updateMyCalendarSchedule,
};
