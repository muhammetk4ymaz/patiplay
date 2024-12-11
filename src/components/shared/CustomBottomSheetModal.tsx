import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  children?: React.ReactNode;
};

const CustomBottomSheetModal = (props: Props) => {
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const insets = useSafeAreaInsets();

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
        <View
          style={{
            width: '100%',
            paddingBottom: insets.bottom,
          }}>
          {props.children}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default CustomBottomSheetModal;

const styles = StyleSheet.create({});
