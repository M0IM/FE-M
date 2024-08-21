import {useQuery} from '@tanstack/react-query';
import {getMoimSpaceInfo} from 'apis';
import {TMoimSpaceInfoDTO} from 'types/dtos/moim';
import {UseQueryCustomOptions} from 'types/mutations/common';

function useGetMoimSpaceInfo(
  moimId: number,
  queryOptions?: UseQueryCustomOptions<TMoimSpaceInfoDTO>,
) {
  return useQuery({
    queryFn: () => getMoimSpaceInfo({moimId}),
    queryKey: ['moimSpaceInfo', moimId],
    ...queryOptions,
  });
}

export default useGetMoimSpaceInfo;
