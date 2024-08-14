import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ImageInputProps {
  onChange: () => void;
}

export function ImageInput({onChange}: ImageInputProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onChange}>
      <Ionicons
        name="camera"
        size={40}
        style={{marginLeft: 10}}
        color={'#9EA4AA'}
      />
    </TouchableOpacity>
  );
}
