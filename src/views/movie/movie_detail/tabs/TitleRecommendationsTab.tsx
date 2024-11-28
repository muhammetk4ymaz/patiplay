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

const TitleRecommendationsTab = (props: Props) => {
  const recommmendaions = useSelector(
    (state: RootState) => state.titleDetail.recommmendaions,
  );
  const recommmendaionsInitialLoading = useSelector(
    (state: RootState) => state.titleDetail.recommmendaionsInitialLoading,
  );

  return (
    <FlatList
      data={recommmendaions}
      scrollEnabled={false}
      initialNumToRender={5}
      ListHeaderComponent={() => {
        return (
          recommmendaionsInitialLoading && (
            <View
              style={{
                paddingVertical: Theme.spacing.columnGap,
              }}>
              <ActivityIndicator
                size="large"
                color={Theme.colors.primary}
                animating={recommmendaionsInitialLoading}
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

export default React.memo(TitleRecommendationsTab);

const styles = StyleSheet.create({});
