import {TouchableOpacity, View} from 'react-native';
import {Typography} from '../@common/Typography/Typography.tsx';

function AddPostHeaderRight(onSubmit: () => void) {
  return (
    <TouchableOpacity className="px-3" onPress={onSubmit}>
      <Typography className="text-main" fontWeight={'BOLD'}>
        추가하기
      </Typography>
    </TouchableOpacity>
  );
}

export default AddPostHeaderRight;
