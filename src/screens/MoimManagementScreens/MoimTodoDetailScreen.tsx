import {SafeAreaView} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';

import {MoimManagementRouteProp} from 'navigators/types';

export default function MoimTodoDetailScreen({
  route,
}: {
  route: MoimManagementRouteProp;
}) {
  const moimId = route.params.id as number;
  console.log(moimId);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Typography fontWeight={'BOLD'}>MoimTodoDetailScreen {moimId}</Typography>
    </SafeAreaView>
  );
}
