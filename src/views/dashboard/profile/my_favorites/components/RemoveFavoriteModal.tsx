import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomBottomSheetModal from '../../../../../components/shared/CustomBottomSheetModal';
import CustomText from '../../../../../components/shared/CustomText';
import {Theme} from '../../../../../constants/Theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

type Props = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
};

const RemoveFavoriteModal = (props: Props) => {
  return (
    <CustomBottomSheetModal bottomSheetModalRef={props.bottomSheetModalRef}>
      <View style={{width: '100%'}}>
        <TouchableOpacity
          style={{
            padding: 12,
            backgroundColor: 'transparent',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 4,
          }}>
          <MaterialIcons
            name="heart-broken"
            color="white"
            size={28}
            style={{marginRight: 8}}
          />
          <CustomText
            text="Remove from My Favorites"
            style={{
              color: 'white',
              fontSize: 16,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.bottomSheetModalRef.current?.dismiss();
          }}
          style={{padding: 12, backgroundColor: 'transparent'}}>
          <CustomText
            text="Cancel"
            style={{
              color: Theme.colors.primary,
              textAlign: 'center',
              fontSize: 16,
            }}
          />
        </TouchableOpacity>
      </View>
    </CustomBottomSheetModal>
  );
};

export default RemoveFavoriteModal;

const styles = StyleSheet.create({});
