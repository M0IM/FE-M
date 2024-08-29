import {create} from 'zustand';
import {TDetailMoimCalendarDTO, TMoimPlanListDTO} from 'types/dtos/calendar.ts';

interface IMoimCalendarStore {
  moimCalendar: TDetailMoimCalendarDTO | null;
  setMoimCalendar: (value: TDetailMoimCalendarDTO) => void;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}

const useMoimCalendarStore = create<IMoimCalendarStore>(set => ({
  moimCalendar: null,
  setMoimCalendar: (moimCalendar: TDetailMoimCalendarDTO) => {
    set({moimCalendar});
  },
  isEditMode: false,
  setIsEditMode: (isEditMode: boolean) => {
    set({isEditMode});
  },
}));

export default useMoimCalendarStore;
