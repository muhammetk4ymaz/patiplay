import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Theme} from '../../../../utils/theme';
import nowPlayMovies from '../../../../models/now_play_movies';
import ClipItem from '../../../../components/shared/CustomComponents/ClipItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const width = Dimensions.get('window').width;

type Props = {
  data: any;
  scrollEnabled?: boolean;
};

const ClipsTab = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    console.log('ClipsTab', props.data);
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
        data={props.data.clips}
        scrollEnabled={props.scrollEnabled}
        numColumns={2}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          rowGap: Theme.spacing.rowGap,
        }}
        columnWrapperStyle={{
          columnGap: Theme.spacing.columnGap,
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => <ClipItem item={item} />}></FlatList>
    );
  }
};

export default ClipsTab;

const styles = StyleSheet.create({});
