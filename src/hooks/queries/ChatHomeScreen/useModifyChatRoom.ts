import {useMutation} from '@tanstack/react-query';

import {UseMutationCustomOptions} from 'types/mutations/common.ts';
import {modifyChatRoom} from 'apis/chat.ts';

function useModifyChatRoom(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: modifyChatRoom,
    onError: error => console.log(error),
    ...mutationOptions,
  });
}

export default useModifyChatRoom;
