import {create} from 'zustand';

interface IUseFcmTokenStore {
  fcmToken: string | null;
  setFcmToken: (token: string) => void;
}

const useFcmTokenStore = create<IUseFcmTokenStore>(set => ({
  fcmToken: null,
  setFcmToken: (fcmToken: string) => {
    set({fcmToken});
  },
}));

export default useFcmTokenStore;
