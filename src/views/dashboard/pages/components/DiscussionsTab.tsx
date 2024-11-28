import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import Dicussion from '../../../../components/shared/Discussion';
import {Theme} from '../../../../constants/Theme';
import nowPlayMovies from '../../../../models/now_play_movies';
const {width, height} = Dimensions.get('window');

type Props = {};

const DiscussionsTab = (props: Props) => {
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
        contentContainerStyle={{
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: 12,
          paddingVertical: 12,
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <Dicussion replyOnPress={() => {}} />
        )}></FlatList>
    );
  }
};

export default DiscussionsTab;

const styles = StyleSheet.create({});
