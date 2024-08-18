import PostForm from 'components/post/PostForm.tsx';
import {MoimStackParamList} from '../../navigators/types';
import {RouteProp} from '@react-navigation/native';

interface IMoimWriteScreenProps {
  route: RouteProp<MoimStackParamList, 'MOIM_WRITE'>;
}

export default function MoimWriteScreen({route}: IMoimWriteScreenProps) {
  const moimId = route.params.id as number;

  return <PostForm moimId={moimId} />;
}
