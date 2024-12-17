import axios from 'axios';
import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import networkService from '../../../../helpers/networkService';
import {Theme} from '../../../../utils/theme';
import CommentsTab from '../../../dashboard/pages/components/CommentsTab';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {fetchRecommendations} from '../../../../redux/features/titledetail/titleDetailSlice';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

type Props = {
  uuid: string;
};

const width = Dimensions.get('window').width;

const TitleRecommendationsTab = (props: Props) => {
  const loading = useAppSelector(
    state => state.titleDetail.fetchRecommendationLoading,
  );
  const recommendations = useAppSelector(
    state => state.titleDetail.recommendations,
  );

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    console.log('Rendered CommentTab');

    dispatch(fetchRecommendations(props.uuid));
  }, []);

  if (loading) {
    return <LoadingWidget />;
  } else {
    return (
      <CommentsTab
        data={recommendations}
        endpoint="title-recommendation"
        refreshData={() => {
          dispatch(fetchRecommendations(props.uuid));
        }}
        uuid={props.uuid}
        scrollEnabled={false}
      />
    );
  }
};

export default React.memo(TitleRecommendationsTab);

const styles = StyleSheet.create({});
