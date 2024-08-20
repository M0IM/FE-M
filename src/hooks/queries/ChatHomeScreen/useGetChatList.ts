import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import {TChatListResponse} from 'types/dtos/chat.ts';
import {ResponseError} from 'types/mutations/common.ts';
import {getChatList} from 'apis/chat.ts';

function useGetInfiniteChatList(
  chatRoomId: number,
  queryOptions?: UseInfiniteQueryOptions<
    TChatListResponse,
    ResponseError,
    InfiniteData<TChatListResponse, number>,
    TChatListResponse,
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryFn: ({pageParam}) => getChatList({cursor: pageParam, chatRoomId}),
    queryKey: ['chatList', chatRoomId],
    initialPageParam: 1,
    getNextPageParam: (lastPage, _) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    ...queryOptions,
  });
}

export {useGetInfiniteChatList};
