import { forwardRef, useCallback, useMemo } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';

type Ref = BottomSheet;

interface CustomBottomSheetModalProps {
  children: React.ReactNode;
  handleClosePress: () => void;
  minHeight: string;
  maxHeight: string;
}

const CustomBottomSheetModal = forwardRef<Ref, CustomBottomSheetModalProps>(
  ({ 
    children, 
    minHeight, 
    maxHeight,
  }, ref: any) => {
    const snapPoints = useMemo(() => [minHeight, maxHeight], []);

    const renderBackdrop = useCallback(
			(props: any) => (
				<BottomSheetBackdrop
					appearsOnIndex={0}
					disappearsOnIndex={-1}
					{...props}
				/>
			),
			[],
		);

    return (
      <BottomSheetModal 
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
				enableContentPanningGesture={false}
        handleIndicatorStyle={{
					backgroundColor: '#ffffff',
				}}
				backgroundStyle={{
					backgroundColor: '#ffffff',
				}}
				backdropComponent={renderBackdrop}
      >
        <BottomSheetView>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

CustomBottomSheetModal.displayName = 'CustomBottomSheetModal';

export default CustomBottomSheetModal;
