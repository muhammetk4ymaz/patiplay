import {RouteProp, useRoute} from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Discussion from '../../../../components/shared/Discussion/Discussion';
import networkService from '../../../../helpers/networkService';
import {Theme} from '../../../../utils/theme';
import {ReplyInput} from '../../../../components/shared/ReplyModal';
import Comment from '../../../../components/shared/Comment/Comment';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

type Props = {};

type RouteParams = {
  Discussion: {
    discussionId: number;
  };
};

const DiscussionView = (props: Props) => {
  const route = useRoute<RouteProp<RouteParams, 'Discussion'>>();

  const [loading, setLoading] = React.useState(true);

  const [discussionData, setDiscussionData] = React.useState<any>({});

  const ReplyInputRef = React.useRef<any>(null);

  const [reply, setReplyText] = React.useState('');

  const [replyId, setReplyId] = React.useState(discussionData.id);

  const fetchDiscussionData = async () => {
    try {
      const response = await networkService.post(
        'title/api/title-discussion-detail/',
        {
          id: route.params.discussionId,
        },
      );
      console.log(response.data);
      setDiscussionData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);

          switch (error.response.status) {
            case 400:
              console.log('Hatalı istek. Lütfen bilgilerinizi kontrol edin.');

              break;
            case 401:
              console.log(
                'Yetkisiz giriş. Lütfen kullanıcı adınızı ve şifrenizi kontrol edin.',
              );

              break;
            case 500:
              console.log('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');

              break;
            default:
              console.log(
                'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.',
              );
          }
        } else if (error.request) {
          console.log(error.request);
          console.log(
            'Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.',
          );
        } else {
          console.log('Error', error.message);
          console.log('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
      } else {
        console.log('Error', error);
        console.log('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDiscussionData();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: Theme.colors.background,
        }}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={discussionData.replies}
          contentContainerStyle={{
            paddingHorizontal: 18,
          }}
          ListHeaderComponent={() => {
            return (
              <TouchableOpacity
                style={{
                  padding: 12,
                  backgroundColor: Theme.colors.sambucus,
                  borderRadius: 12,
                  marginBottom: 12,
                }}
                onPress={() => {}}>
                <Discussion
                  isCommentable={true}
                  replyOnPress={() => {
                    console.log('ReplyOnPress');
                    setReplyText('');
                    setReplyId(discussionData.id);
                    ReplyInputRef.current?.focus();
                  }}
                  endpoint={'title-discussion'}
                  uuid={discussionData.id}
                  item={discussionData}
                />
              </TouchableOpacity>
            );
          }}
          style={{flex: 1, backgroundColor: Theme.colors.background}}
          renderItem={({item}) => (
            <View style={{paddingLeft: 48, paddingVertical: 12}}>
              <DiscussionReplies
                data={item}
                endpoint={'title-discussion-message'}
                bottomSheetModalRef={ReplyInputRef}
                replyOnPress={(username: string, id: number) => {
                  console.log('ReplyOnPress');
                  setReplyText(username + ' ');
                  setReplyId(id);
                  ReplyInputRef.current?.focus();
                }}
              />
              {/* <Discussion
                isCommentable={true}
                replyOnPress={() => {
                  
                }}
                endpoint={'title-discussion-message'}
                item={item}
                uuid={item.id}
              /> */}
            </View>
          )}
        />
        <ReplyInput
          endpoint={'title-discussion-message'}
          commentId={replyId}
          onSend={() => {
            fetchDiscussionData();
          }}
          ref={ReplyInputRef}
          reply={reply}
        />
      </View>
    );
  }
};

export default DiscussionView;

const styles = StyleSheet.create({});

type DiscussionRepliesProps = {
  data: any;
  endpoint: string;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  replyOnPress: (username: string, id: number) => void;
};

const DiscussionReplies = (props: DiscussionRepliesProps) => {
  React.useEffect(() => {
    console.log('Replies data', props.data);
  });
  return (
    <View>
      <Discussion
        isCommentable={true}
        endpoint={props.endpoint}
        item={props.data}
        uuid={props.data.id}
        replyOnPress={() => {
          props.replyOnPress(props.data.username, props.data.id);
        }}
      />
      {props.data.replies.length > 0 && (
        <FlatList
          data={props.data.replies}
          scrollEnabled={false}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item}: {item: any}) => {
            return (
              <DiscussionReplies
                bottomSheetModalRef={props.bottomSheetModalRef}
                data={item}
                endpoint={props.endpoint}
                replyOnPress={(username: string, id: number) => {
                  props.replyOnPress(username, id);
                }}
              />
            );
          }}></FlatList>
      )}
    </View>
  );
};
