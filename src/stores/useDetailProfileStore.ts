import {create} from 'zustand';

import {TUserDTO} from 'types/dtos/user.ts';

interface IDetailProfileStore {
  detailProfile: TUserDTO | null;
  setDetailProfile: (detailProfile: TUserDTO) => void;
}

const useDetailProfileStore = create<IDetailProfileStore>(set => ({
  detailProfile: null,
  setDetailProfile: (detailProfile: TUserDTO) => {
    set({detailProfile});
  },
}));

export default useDetailProfileStore;
