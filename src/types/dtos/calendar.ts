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
  isParticipant: boolean;
};

type TCalendarMoimPlanDTO = {
  memberWithPlanCnt: number;
  planList: TPlanListDTO[];
};

type TCalendarPersonalResponse = Record<string, TPlanListDTO[]>;

type TCalendarMoimResponse = Record<string, TMoimPlanListDTO[]>;

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
  date: Date;
  location: string;
  locationDetail: string;
  cost: number;
  schedules: TScheduleDTO[];
};

export type {
  TPlanListDTO,
  TMoimPlanListDTO,
  TCalendarPersonalResponse,
  TCalendarMoimResponse,
  TDetailMoimCalendarDTO,
  TPostDetailMoimCalendarDTO,
};
