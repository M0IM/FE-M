// Record<number, CalendarPost[]>

type TPlanList = {
  planId: string;
  title: string;
  location: string;
  locationDetail: string;
  time: Date;
  isParticipant: boolean;
};

type TCalendarPlanDTO = {
  memberWithPlanCnt: number;
  planList: TPlanList[];
};

type TCalendarPersonalResponse = Record<number, TCalendarPlanDTO[]>;

export type {TCalendarPersonalResponse};
