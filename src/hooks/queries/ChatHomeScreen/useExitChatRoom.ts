import {useMutation} from '@tanstack/react-query';

import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {exitChatRoom} from 'apis/chat.ts';

function useExitChatRoom(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: exitChatRoom,
    onError: error => console.log(error),
    ...mutationOptions,
  });
}

export default useExitChatRoom;
