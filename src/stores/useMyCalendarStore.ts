import {create} from 'zustand';
import {TPlanListDTO} from 'types/dtos/calendar.ts';

interface IMyCalendarStore {
  myCalendar: TPlanListDTO | null;
  setMyCalendar: (value: TPlanListDTO) => void;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
}

const useMyCalendarStore = create<IMyCalendarStore>(set => ({
  myCalendar: null,
  setMyCalendar: (myCalendar: TPlanListDTO) => {
    set({myCalendar});
  },
  isEditMode: false,
  setIsEditMode: (isEditMode: boolean) => {
    set({isEditMode});
  },
}));

export default useMyCalendarStore;
