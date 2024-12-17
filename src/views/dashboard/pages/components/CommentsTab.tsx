import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Comment from '../../../../components/shared/Comment/Comment';
import {CommentInput} from '../../../../components/shared/Comment/CommentInput';
import CustomText from '../../../../components/shared/CustomText';
import {ReplyModal} from '../../../../components/shared/ReplyModal';
import {Theme} from '../../../../utils/theme';
import LoadingWidget from '../../../../components/shared/LoadingWidget';

const width = Dimensions.get('window').width;

type Props = {
  data: any;
  uuid: string;
  refreshData: () => void;
  scrollEnabled?: boolean;
  endpoint: string;
  commentInputVisible?: boolean;
};

const CommentsTab = (props: Props) => {
  const [loading, setLoading] = React.useState(false);

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const [replyData, setReplyData] = React.useState<any>({});
  const [replyIndex, setReplyIndex] = React.useState<number>(0);

  const scrollRef = React.useRef<FlatList>(null);

  React.useEffect(() => {
    setReplyData(props.data[replyIndex]);
    setTimeout(() => {
      if (replyData?.length > 0) {
        scrollRef.current?.scrollToIndex({
          index: 0,
          animated: true,
          viewOffset: 12,
        });
      }
    }, 500);
  }, [props.refreshData]);

  if (loading) {
    return <LoadingWidget />;
  } else {
    if (props.data.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: width,
          }}>
          <CustomText text="No comments yet" style={{color: 'white'}} />
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <FlatList
          removeClippedSubviews={true}
          ref={scrollRef}
          scrollEnabled={props.scrollEnabled}
          data={props.data}
          contentContainerStyle={{
            paddingHorizontal: Theme.paddings.viewHorizontalPadding,
            gap: 12,
          }}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <View style={{gap: 5}}>
              <Comment
                endpoint={props.endpoint}
                item={item}
                replyOnPress={() => {
                  setReplyData(item);
                  setReplyIndex(index);
                  bottomSheetModalRef.current?.present();
                }}
              />

              {item.replies.length > 0 && (
                <TouchableOpacity
                  style={{
                    marginLeft: 30,
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                  }}
                  onPress={() => {
                    setReplyData(item);
                    setReplyIndex(index);
                    bottomSheetModalRef.current?.present();
                  }}>
                  <CustomText
                    text={`${item.replies.reduce(
                      (total: any, reply: any) => total + reply.replies.length,
                      item.replies.length,
                    )} reply`}
                    style={{
                      color: '#3ea6ff',
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}></FlatList>
        {props.commentInputVisible && (
          <CommentInput
            endpoint={props.endpoint}
            onSend={() => {
              props.refreshData();
            }}
            uuid={props.uuid}
          />
        )}
        <ReplyModal
          endpoint={props.endpoint}
          bottomSheetRef={bottomSheetModalRef}
          data={replyData}
          onSend={() => {
            props.refreshData();
          }}
        />
      </View>
    );
  }
};

export default CommentsTab;

CommentsTab.defaultProps = {
  scrollEnabled: true,
  commentInputVisible: true,
};

const styles = StyleSheet.create({});
