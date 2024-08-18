type TMoimDTOResponse = {
  moimId: number;
  title: string;
  description: string;
  category: string;
  address: string;
  profileImage: string;
  memberCount: number;
  createdAt: Date;
  updateAt: Date;
};

type TGetMyActiveMoimResponse = {
  moimPreviewList: TMoimDTOResponse[];
  nextCursor: number;
  hasNext: boolean;
};

export type {TMoimDTOResponse, TGetMyActiveMoimResponse};
