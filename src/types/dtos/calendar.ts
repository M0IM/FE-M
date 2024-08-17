// Record<number, CalendarPost[]>

type TPlanList = {
  planId: string;
  title: string;
  location: string;
  locationDetail: string;
  time: Date;
  isParticipant: boolean;
};

type TCalendarPersonalPlanDTO = {
  planList: TPlanList[];
};

type TCalendarMoimPlanDTO = {
  memberWithPlanCnt: number;
  planList: TPlanList[];
};

type TCalendarPersonalResponse = Record<number, TCalendarPersonalPlanDTO[]>;

type TCalendarMoimResponse = Record<number, TCalendarMoimPlanDTO>;

export type {TCalendarPersonalResponse, TCalendarMoimResponse};
