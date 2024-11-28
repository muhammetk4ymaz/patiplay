import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {Theme} from '../../../../constants/Theme';
import DicussionNew from '../../../../components/shared/DicussionNew';
import Discussion from '../../../../components/shared/Discussion';

type Props = {};

const width = Dimensions.get('window').width;

const TitleDiscussionsTab = (props: Props) => {
  const discussions = useSelector(
    (state: RootState) => state.titleDetail.discussions,
  );
  const discussionsInitialLoading = useSelector(
    (state: RootState) => state.titleDetail.discussionsInitialLoading,
  );

  return (
    <FlatList
      data={discussions}
      scrollEnabled={false}
      initialNumToRender={4}
      ListHeaderComponent={() => {
        return (
          discussionsInitialLoading && (
            <View
              style={{
                paddingVertical: Theme.spacing.columnGap,
              }}>
              <ActivityIndicator
                size="large"
                color={Theme.colors.primary}
                animating={discussionsInitialLoading}
              />
            </View>
          )
        );
      }}
      contentContainerStyle={{
        paddingHorizontal: Theme.paddings.viewHorizontalPadding,
        gap: Theme.spacing.rowGap,
      }}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => {
        return <Discussion replyOnPress={() => {}} />;
      }}
    />
  );
};

export default React.memo(TitleDiscussionsTab);

const styles = StyleSheet.create({});
