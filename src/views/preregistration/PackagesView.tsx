import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ContentWithIconCard from '../../components/shared/Cards/ContentWithIconCard';
import {Theme} from '../../constants/Theme';
import {AuthIcon} from '../../../assets/icons';

type Props = {};

const PackagesView = (props: Props) => {
  return (
    <ScrollView
      contentContainerStyle={[styles.view]}
      keyboardShouldPersistTaps="handled">
      <ContentWithIconCard icon={<AuthIcon size={100} />}>
        <View></View>
      </ContentWithIconCard>
    </ScrollView>
  );
};

export default PackagesView;

const styles = StyleSheet.create({
  view: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Theme.paddings.viewHorizontalPadding,
    backgroundColor: Theme.colors.background,
    paddingVertical: 100,
  },
});
