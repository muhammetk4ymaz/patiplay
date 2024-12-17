import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextButton from '../../components/shared/Buttons/CustomTextButton';
import ContentWithIconCard from '../../components/shared/Cards/ContentWithIconCard';
import CustomText from '../../components/shared/CustomText';
import {ImageManager} from '../../constants/ImageManager';
import {Theme} from '../../utils/theme';

type Props = {};

const UpdateView = (props: Props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
      }}>
      <ContentWithIconCard
        button={
          <View style={{backgroundColor: 'black'}}>
            <CustomTextButton
              text={'Update'}
              backgroundColor="black"
              border={true}
              onPress={() => {
                console.log('Update');
              }}
              paddingHorizontal={36}
            />
          </View>
        }
        icon={
          <Image
            source={ImageManager.IMAGE_NAMES.PATIPLAYLOGO}
            style={{
              height: 80,
              width: 80,
            }}
          />
        }>
        <View style={{gap: 5, paddingBottom: 24, alignSelf: 'center'}}>
          <CustomText
            text="The latest version of the application is available. You need to update to continue."
            style={{color: 'white', textAlign: 'center'}}
          />
        </View>
      </ContentWithIconCard>
    </SafeAreaView>
  );
};

export default UpdateView;

const styles = StyleSheet.create({});
