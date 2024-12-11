import {View, Text, Keyboard, StyleSheet} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import OutsidePressHandler from 'react-native-outside-press';
import {Theme} from '../../../../utils/theme';
import {setSearchFilterVisible} from '../../../../redux/features/search/searchSlice';
import CustomText from '../../../../components/shared/CustomText';

const FilterModal = React.memo(() => {
  const searchFilterVisible = useAppSelector(
    state => state.search.searchFilterVisible,
  );

  console.log('FilterModal rendered');

  const dispatch = useAppDispatch();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '75%'], []);

  // callbacks
  const handlePresentModalPress = () => {
    if (searchFilterVisible) {
      Keyboard.dismiss();
      bottomSheetModalRef.current?.present();
    }
  };

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  React.useEffect(() => {
    handlePresentModalPress();
  }, [searchFilterVisible]);

  return (
    <OutsidePressHandler
      onOutsidePress={() => {
        bottomSheetModalRef.current?.dismiss();
      }}>
      <BottomSheetModal
        backgroundStyle={{backgroundColor: Theme.colors.background}}
        handleIndicatorStyle={{backgroundColor: Theme.colors.white}}
        ref={bottomSheetModalRef}
        onDismiss={() => {
          dispatch(setSearchFilterVisible(false));
        }}
        index={0}
        snapPoints={snapPoints}
        enableDismissOnClose={true}
        onChange={handleSheetChanges}>
        <BottomSheetView style={styles.contentContainer}>
          <CustomText text="Filter 🎉" style={{color: 'white'}} />
        </BottomSheetView>
      </BottomSheetModal>
    </OutsidePressHandler>
  );
});

export default FilterModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
});
