import axiosInstance from './axiosInstance.ts';
import {TCalendarPersonalResponse} from '../types/dtos/calendar.ts';

const getPersonalCalendar = async ({
  year,
  month,
}: {
  year: number;
  month: number;
}): Promise<TCalendarPersonalResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1/moim/calender/individual-plans?year=${year}&month=${month}`,
  );

  console.log(data.result.planList);

  return data.result.planList;
};

export {getPersonalCalendar};
