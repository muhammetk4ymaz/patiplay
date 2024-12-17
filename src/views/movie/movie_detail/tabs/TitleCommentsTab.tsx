import axios from 'axios';
import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import networkService from '../../../../helpers/networkService';
import {Theme} from '../../../../utils/theme';
import CommentsTab from '../../../dashboard/pages/components/CommentsTab';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {fetchComments} from '../../../../redux/features/titledetail/titleDetailSlice';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

type Props = {
  uuid: string;
};

const width = Dimensions.get('window').width;

const TitleCommentsTab = (props: Props) => {
  const loading = useAppSelector(
    state => state.titleDetail.fetchCommentLoading,
  );
  const comments = useAppSelector(state => state.titleDetail.comments);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    console.log('Rendered CommentTab');

    dispatch(fetchComments(props.uuid));
  }, []);

  if (loading) {
    return <LoadingWidget />;
  } else {
    return (
      <View style={{gap: 12}}>
        <CommentsTab
          data={comments}
          endpoint="title-comment"
          refreshData={() => {
            dispatch(fetchComments(props.uuid));
          }}
          uuid={props.uuid}
          scrollEnabled={false}
          commentInputVisible={false}
        />
      </View>
    );
  }
};

export default React.memo(TitleCommentsTab);

const styles = StyleSheet.create({});
