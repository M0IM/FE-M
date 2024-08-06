import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import {StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

type TBottomSheetProps = {
  isBottomSheetOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setInputState?: Dispatch<SetStateAction<boolean>>;
  height?: number;
};

export default function BottomSheet({
  isBottomSheetOpen,
  onOpen,
  onClose,
  setInputState,
  height,
  children,
}: PropsWithChildren<TBottomSheetProps>) {
  const bottomSheetRef = useRef<RBSheet>(null);

  useEffect(() => {
    if (bottomSheetRef.current) {
      isBottomSheetOpen
        ? bottomSheetRef.current.open()
        : bottomSheetRef.current.close();
    }
  }, [isBottomSheetOpen]);

  const handleOpenBottomSheet = () => {
    onOpen();
  };

  const handleCloseBottomSheet = () => {
    onClose();
    setInputState?.(false);
  };

  return (
    <RBSheet
      ref={bottomSheetRef}
      onOpen={handleOpenBottomSheet}
      onClose={handleCloseBottomSheet}
      keyboardAvoidingViewEnabled={true}
      height={height ?? 200}
      customStyles={bottomSheetStyles}>
      {children}
    </RBSheet>
  );
}

const bottomSheetStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: 'white',
  },
});
