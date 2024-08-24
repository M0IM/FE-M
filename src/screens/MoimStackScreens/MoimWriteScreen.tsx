import PostForm from 'components/post/PostForm.tsx';
import {MoimStackParamList} from '../../navigators/types';
import {RouteProp, useRoute} from '@react-navigation/native';

export default function MoimWriteScreen() {
  const route = useRoute<RouteProp<MoimStackParamList, 'MOIM_WRITE'>>();
  const moimId = route.params.id as number;

  return <PostForm moimId={moimId} />;
}
