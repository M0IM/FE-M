import axiosInstance from './axiosInstance.ts';
import {
  TCalendarMoimResponse,
  TCalendarPersonalResponse,
} from '../types/dtos/calendar.ts';

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

export {getMoimCalendar, getPersonalCalendar};
