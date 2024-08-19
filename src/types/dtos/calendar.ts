type TPlanListDTO = {
  planId: number;
  title: string;
  location: string;
  locationDetail: string;
  time: string;
};

type TMoimPlanListDTO = {
  planId: number;
  title: string;
  location: string;
  locationDetail: string;
  time: string;
  isParticipant?: boolean;
};

type TCalendarMoimPlanDTO = {
  memberWithPlanCnt: number;
  planList: TPlanListDTO[];
};

type TCalendarPersonalResponse = Record<string, TPlanListDTO[]>;

type TCalendarMoimResponse = Record<string, TCalendarMoimPlanDTO>;

type TScheduleDTO = {
  title: string;
  startTime: string;
};

type TDetailMoimCalendarDTO = {
  planId: number;
  title: string;
  date: string;
  location: string;
  cost: string;
  participant: number;
  schedules: TScheduleDTO[];
  isParticipant: boolean;
};

type TPostDetailMoimCalendarDTO = {
  moimId: number;
  title: string;
  date: string;
  startTime: string;
  location: string;
  locationDetail: string;
  cost: string;
  schedules: TScheduleDTO[];
};

type TMyCalendarDTO = {
  date: Date;
  content: string;
};

export type {
  TPlanListDTO,
  TMoimPlanListDTO,
  TCalendarPersonalResponse,
  TCalendarMoimResponse,
  TDetailMoimCalendarDTO,
  TPostDetailMoimCalendarDTO,
  TCalendarMoimPlanDTO,
  TMyCalendarDTO,
};
