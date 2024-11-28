import React, {memo, useCallback, useRef} from 'react';
import {useState} from 'react';
import {ActivityIndicator, Dimensions, FlatList, View} from 'react-native';
import nowPlayMovies from '../../../../models/now_play_movies';
import {Theme} from '../../../../constants/Theme';
import CustomText from '../../../../components/shared/CustomText';
import {ChartTitleItem} from './components/ChartTitleItem';
import topMovies from '../../../../models/topMovies';

const {width} = Dimensions.get('window');

interface Props {
  title: string;
}

// const arePropsEqual = (prevProps: Props, nextProps: Props) => {
//   console.log('arePropsEqual');
//   if (prevProps.title === nextProps.title) {
//     return true; // props are equal
//   }
//   return false; // props are not equal -> update the component
// };

const TitleChartsView = memo(({title}: Props) => {
  const [loading, setLoading] = useState(true);

  console.log('TitleChartsView');

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: width,
        }}>
        <ActivityIndicator
          size="large"
          color={Theme.colors.primary}
          animating={loading}
        />
      </View>
    );
  } else {
    return (
      <FlatList
        data={topMovies}
        numColumns={3}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: Theme.spacing.rowGap,
        }}
        columnWrapperStyle={{
          gap: Theme.spacing.columnGap,
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ChartTitleItem title={item.title} poster_path={item.poster_path} />
        )}></FlatList>
    );
  }
});

export default TitleChartsView;
