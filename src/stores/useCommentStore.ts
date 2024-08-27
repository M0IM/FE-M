import {create} from 'zustand';

interface CommentStoreState {
  commentId: number | null;
  comment: string;
  recomment: string;
  setComment: (comment: string) => void;
  setRecomment: (recomment: string) => void;
  handleUpdateCommentId: (commentId: number | null) => void;
}

const useCommentStore = create<CommentStoreState>(set => ({
  commentId: null,
  comment: '',
  recomment: '',
  setComment: (comment: string) => set({comment}),
  setRecomment: (recomment: string) => set({recomment}),
  handleUpdateCommentId: (commentId: number | null) => set({commentId}),
}));

export default useCommentStore;
