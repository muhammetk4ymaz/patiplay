import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Theme} from '../../../../utils/theme';
import topMovies from '../../../../models/topMovies';
import VerticalPoster from '../../../../components/shared/VerticalPoster';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../../../components/shared/CustomText';
import SectionTitleText from '../../../../components/shared/Texts/SectionTitleText';

const SPACING = 10;

const BestMatches = () => {
  return (
    <View
      style={{
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        gap: SPACING,
      }}>
      <SectionTitleText title="Best Matches" />
      <FlatList
        scrollEnabled={false}
        numColumns={4}
        columnWrapperStyle={{gap: SPACING}}
        contentContainerStyle={{gap: SPACING}}
        data={topMovies.slice(0, 8)}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <VerticalPoster
            posterPath={item.poster_path}
            width={
              (Dimensions.get('window').width -
                2 * Theme.paddings.viewHorizontalPadding -
                3 * SPACING) /
              4
            }
          />
        )}
      />

      <TouchableOpacity onPress={() => {}} style={{marginTop: 4}}>
        <LinearGradient
          colors={['#8b5cf6', '#a855f7']} // from violet-500 to purple-500
          style={{
            paddingHorizontal: 12,
            paddingVertical: 12,
            borderRadius: 36,
            alignItems: 'center',
          }}>
          <CustomText
            text="Mission Possible"
            style={{color: 'white', fontSize: Theme.fontSizes.md}}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default BestMatches;

const styles = StyleSheet.create({});
