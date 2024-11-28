import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Theme} from '../../../../constants/Theme';
import nowPlayMovies from '../../../../models/now_play_movies';
import ClipItem from '../../../../components/shared/CustomComponents/ClipItem';

const width = Dimensions.get('window').width;

type Props = {};

const ClipsTab = (props: Props) => {
  const [loading, setLoading] = React.useState(true);

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
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: Theme.spacing.columnGap,
        }}
        columnWrapperStyle={{
          gap: Theme.spacing.rowGap,
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => <ClipItem item={item} />}></FlatList>
    );
  }
};

export default ClipsTab;

const styles = StyleSheet.create({});
