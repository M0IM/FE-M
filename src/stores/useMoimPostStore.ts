import {TPostDetailDto} from 'types/dtos/post';
import {create} from 'zustand';

interface IMoimPoststore {
  postInfo: TPostDetailDto | null;
  setPostInfo: (postInfo: TPostDetailDto | null) => void;
}

const useMoimPostStore = create<IMoimPoststore>(set => ({
  postInfo: null,
  setPostInfo: (postInfo: TPostDetailDto | null) => {
    set({postInfo});
  },
}));

export default useMoimPostStore;
