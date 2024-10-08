import BottomSheet from 'components/@common/BottomSheet/BottomSheet';
import MoimMembersView from './MoimMembersView';

interface MoimMemberBottomSheetProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  moimId: number;
}

const MoimMemberBottomSheet = ({
  isOpen,
  onOpen,
  onClose,
  moimId,
}: MoimMemberBottomSheetProps) => {
  return (
    <BottomSheet
      isBottomSheetOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      height={550}>
      <MoimMembersView moimId={moimId} onClose={onClose} />
    </BottomSheet>
  );
};

export default MoimMemberBottomSheet;
