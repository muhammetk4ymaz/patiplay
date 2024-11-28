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

type Props = {};

const width = Dimensions.get('window').width;

const TitleCommentsTab = (props: Props) => {
  const comments = useSelector(
    (state: RootState) => state.titleDetail.comments,
  );
  const commentsInitialLoading = useSelector(
    (state: RootState) => state.titleDetail.commentsInitialLoading,
  );

  return (
    <FlatList
      data={comments}
      scrollEnabled={false}
      initialNumToRender={5}
      ListHeaderComponent={() => {
        return (
          commentsInitialLoading && (
            <View
              style={{
                paddingVertical: Theme.spacing.columnGap,
              }}>
              <ActivityIndicator
                size="large"
                color={Theme.colors.primary}
                animating={commentsInitialLoading}
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
        return <DicussionNew replyOnPress={() => {}} />;
      }}
    />
  );
};

export default React.memo(TitleCommentsTab);

const styles = StyleSheet.create({});
