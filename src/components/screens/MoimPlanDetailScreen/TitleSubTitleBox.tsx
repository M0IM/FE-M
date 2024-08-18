import {View} from 'react-native';

import {Typography} from '../../@common/Typography/Typography.tsx';

interface ITitleSubTitleBoxProps {
  title: string;
  subTitle: string;
}

export function TitleSubTitleBox({title, subTitle}: ITitleSubTitleBoxProps) {
  return (
    <View className="flex-row mb-1.5">
      <Typography
        numberOfLines={1}
        className="w-1/5 text-sm text-gray-500"
        fontWeight={'BOLD'}>
        {title}
      </Typography>
      <Typography
        numberOfLines={1}
        className="flex-1 text-gray-500"
        fontWeight={'BOLD'}>
        {subTitle}
      </Typography>
    </View>
  );
}
