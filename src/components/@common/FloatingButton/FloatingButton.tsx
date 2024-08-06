import {cva} from 'class-variance-authority';
import {
  Platform,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {cn} from 'utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface FloatingButtonProps extends TouchableOpacityProps {
  type?: 'add' | 'write';
}

const FloatingButton = ({type = 'add', ...props}: FloatingButtonProps) => {
  const platform = Platform.OS;

  return (
    <View className="absolute right-5 bottom-8 z-50">
      <TouchableOpacity
        {...props}
        className={cn(FloatingButtonVariant({platform}))}>
        {type === 'add' && <Ionicons name="add" size={30} color="white" />}
        {type === 'write' && (
          <MaterialIcons name="edit" size={30} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const FloatingButtonVariant = cva(
  'flex flex-col justify-center items-center rounded-full bg-main p-3 w-[55] h-[55]',
  {
    variants: {
      platform: {
        ios: 'shadow-md shadow-gray-200',
        android: 'elevation-md',
        windows: 'shadow-md shadow-gray-200',
        macos: 'shadow-md shadow-gray-200',
        web: 'shadow-md shadow-gray-200',
      },
    },
  },
);

export default FloatingButton;
