import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import {Theme} from '../../../../utils/theme';
import Discussion from '../../../../components/shared/Discussion/Discussion';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');

type Props = {
  data: any;
  scrollEnabled?: boolean;
  uuid: string;
  endpoint: string;
};

const DiscussionsTab = (props: Props) => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log('DiscussionsTab', props.data);
  }, []);

  const insets = useSafeAreaInsets();

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
        scrollEnabled={props.scrollEnabled}
        data={props.data}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          gap: 12,
        }}
        keyExtractor={index => index.toString()}
        renderItem={({item, index}) => (
          <Discussion item={item} endpoint={props.endpoint} uuid={item.id} />
        )}></FlatList>
    );
  }
};

export default DiscussionsTab;

const styles = StyleSheet.create({});
