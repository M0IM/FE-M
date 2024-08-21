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

type SenderDTO = {
  senderId: number;
  senderName: string;
  senderProfile: string;
};

type ChatResponseDTO = {
  chatId: number;
  content: string;
  imageKeyName: string;
  createAt: Date;
  senderDTO: SenderDTO;
};

type TChatListResponse = {
  chatResponseList: ChatResponseDTO[];
  nextCursor: number;
  hasNext: boolean;
};

export type {
  TChatRoomsDTO,
  TChatRoomResponse,
  TCreateChatRoomDTO,
  TCreateChatRoomResponse,
  TModifyChatRoomDTO,
  TChatListResponse,
};
