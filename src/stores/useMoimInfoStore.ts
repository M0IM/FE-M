import {TMoimSpaceInfoDTO} from 'types/dtos/moim';
import {create} from 'zustand';

interface IMoimInfoStore {
  moimInfo: TMoimSpaceInfoDTO | null;
  setMoinInfo: (moinInfo: TMoimSpaceInfoDTO | null) => void;
}

const useMoimInfoStore = create<IMoimInfoStore>(set => ({
  moimInfo: null,
  setMoinInfo: (moimInfo: TMoimSpaceInfoDTO | null) => {
    set({moimInfo});
  },
}));

export default useMoimInfoStore;
