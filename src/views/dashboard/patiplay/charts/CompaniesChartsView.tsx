import React, {useCallback, useRef} from 'react';
import {useState} from 'react';
import {ActivityIndicator, Dimensions, FlatList, View} from 'react-native';
import nowPlayMovies from '../../../../models/now_play_movies';
import {Theme} from '../../../../constants/Theme';

import ChartOtherItem from './components/ChartOtherItem';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../navigation/routes';

const {width} = Dimensions.get('window');

const CompaniesChartsView = React.memo(() => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
        removeClippedSubviews={true}
        data={nowPlayMovies}
        numColumns={3}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          rowGap: 12,
        }}
        columnWrapperStyle={{
          columnGap: 12,
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ChartOtherItem
            onPress={() => {
              navigation.navigate('CompaniesDetail');
            }}
          />
        )}></FlatList>
    );
  }
});

export default CompaniesChartsView;
