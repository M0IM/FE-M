import {create} from 'zustand';

type State = {
  isAuthenticated: boolean;
};

type Actions = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const useAuthStore = create<State & Actions>(set => ({
  isAuthenticated: false,
  setIsAuthenticated: () =>
    set(state => ({isAuthenticated: !state.isAuthenticated})),
}));

export default useAuthStore;
