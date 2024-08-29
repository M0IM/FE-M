import React from 'react';
import {
  View,
  Pressable,
  Platform,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import {cva} from 'class-variance-authority';
import {Typography} from 'components/@common/Typography/Typography';
import {cn} from 'utils';

type MenuType = {
  id?: number;
  title: string;
  onPress: Function;
};

interface PopoverMenuProps {
  isPopover?: boolean;
  menu: MenuType[];
  onPress: () => void;
  children: React.ReactNode;
  position?: 'BOTTOM' | 'TOP';
}

const PopoverMenu = ({
  isPopover,
  menu,
  onPress,
  children,
  position = 'BOTTOM',
}: PopoverMenuProps) => {
  const platform = Platform.OS;

  return (
    <TouchableWithoutFeedback className="p-3">
      <>
        {children}
        <Modal
          animationType="slide"
          visible={isPopover}
          transparent={true}
          onRequestClose={() => onPress()}>
          <Pressable
            style={{backgroundColor: 'rgba(0, 0, 0, 0.0)', flex: 1}}
            onPress={() => onPress()}>
            <View className={cn(PopoverVariant({platform, position}))}>
              {menu.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    item.onPress();
                    onPress();
                  }}
                  className="active:bg-gray-100 items-center p-[10px] pl-[10px] pr-[10px] rounded-lg">
                  <Typography
                    fontWeight="MEDIUM"
                    className="text-lg text-dark-800 p-1">
                    {item.title}
                  </Typography>
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Modal>
      </>
    </TouchableWithoutFeedback>
  );
};

const PopoverVariant = cva(
  'flex flex-col rounded-2xl p-3 bg-white absolute left-0 right-0 mr-3 ml-3 border-[0.5px] border-gray-200',
  {
    variants: {
      platform: {
        ios: 'shadow-md shadow-gray-200',
        android: 'elevation-lg shadow-gray-400',
        windows: 'shadow-md shadow-gray-200',
        macos: 'shadow-md shadow-gray-200',
        web: 'shadow-md shadow-gray-200',
      },
      position: {
        BOTTOM: 'bottom-10',
        TOP: '',
      },
    },
  },
);

export default PopoverMenu;
