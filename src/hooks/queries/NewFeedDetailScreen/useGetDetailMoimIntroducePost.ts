import {keepPreviousData, useQuery} from '@tanstack/react-query';

import {getDetailMoimIntroducePost} from 'apis/newFeed/posts.ts';

function useGetDetailMoimIntroducePost({postId}: {postId: number}) {
  return useQuery({
    queryFn: () => getDetailMoimIntroducePost({postId}),
    queryKey: ['newFeed', postId],
    placeholderData: keepPreviousData,
  });
}

export default useGetDetailMoimIntroducePost;
