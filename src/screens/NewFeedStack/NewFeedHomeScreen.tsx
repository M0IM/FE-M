import {SafeAreaView} from 'react-native';

import {Typography} from 'components/@common/Typography/Typography.tsx';

function NewFeedHomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Typography fontWeight={'BOLD'}>하이</Typography>
    </SafeAreaView>
  );
}

export default NewFeedHomeScreen;
