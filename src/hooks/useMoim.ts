import {useQuery} from '@tanstack/react-query';

import {getMyMoimRole} from 'apis';

import {UseQueryCustomOptions} from 'types/mutations/common.ts';
import {TMoimRoles} from 'types/dtos/moim.ts';
import {queryKeys} from 'constants/storageKeys/keys.ts';

function useGetMyMoimRole(
  moimId: number,
  queryOptions?: UseQueryCustomOptions<TMoimRoles>,
) {
  return useQuery({
    queryFn: () => getMyMoimRole({moimId}),
    queryKey: [queryKeys.MOIM_ROLE, moimId],
    ...queryOptions,
  });
}

function useMoim() {
  return {
    useGetMyMoimRole,
  };
}

export default useMoim;
