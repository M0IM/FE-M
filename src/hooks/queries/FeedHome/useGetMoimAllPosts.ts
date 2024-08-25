import {useQuery} from '@tanstack/react-query';
import {getMoimAllPostPreviews} from 'apis';
import {TMoimAllPostsPreviews} from 'types/dtos/moim';
import {UseQueryCustomOptions} from 'types/mutations/common';

interface useGetMoimAllPostsProps {
  queryOptions?: UseQueryCustomOptions<TMoimAllPostsPreviews[]>;
}

const useGetMoimAllPosts = ({queryOptions}: useGetMoimAllPostsProps) => {
  return useQuery({
    queryKey: ['allPosts'],
    queryFn: () => getMoimAllPostPreviews(),
    ...queryOptions,
  });
};

export default useGetMoimAllPosts;
