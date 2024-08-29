import BottomSheet from 'components/@common/BottomSheet/BottomSheet';
import RegionView from './RegionView.tsx';

interface IRegionBottomSheetProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setRegion: (region: string) => void;
  handleConfirmRegion: () => void;
}

const RegionBottomSheet = ({
  isOpen,
  onOpen,
  onClose,
  setRegion,
  handleConfirmRegion,
}: IRegionBottomSheetProps) => {
  return (
    <BottomSheet
      isBottomSheetOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      height={550}>
      <RegionView
        onClose={onClose}
        handleConfirmRegion={handleConfirmRegion}
        setRegion={setRegion}
      />
    </BottomSheet>
  );
};

export default RegionBottomSheet;
