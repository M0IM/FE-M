type TChatRoomsDTO = {
  chatRoomId: number;
  title: string;
  imageKeyName: string;
};

type TChatRoomResponse = {
  chatRoomResponses: TChatRoomsDTO[];
  ownerId: number;
  hasNext: boolean;
  nextCursor: number;
};

type TCreateChatRoomDTO = {
  title: string;
  imageKeyName: string;
  roomParticipantIds: number[];
};

type TCreateChatRoomResponse = {
  chatRoomId: number;
  createAt: Date;
  updateAt: Date;
};

type TModifyChatRoomDTO = {
  chatRoomId: number;
  title: string;
  imageKeyName: string;
};

export type {
  TChatRoomResponse,
  TCreateChatRoomDTO,
  TCreateChatRoomResponse,
  TModifyChatRoomDTO,
};
