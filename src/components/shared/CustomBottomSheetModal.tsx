import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';

type Props = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  children?: React.ReactNode;
};

const CustomBottomSheetModal = (props: Props) => {
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModal
      ref={props.bottomSheetModalRef}
      handleIndicatorStyle={{backgroundColor: 'transparent'}}
      backgroundStyle={{backgroundColor: 'black'}}
      containerStyle={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        pointerEvents: 'auto',
      }}
      onChange={handleSheetChanges}>
      <BottomSheetView
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          top: -12,
        }}>
        {props.children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default CustomBottomSheetModal;

const styles = StyleSheet.create({});
