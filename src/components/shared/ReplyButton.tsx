import {TouchableOpacity} from 'react-native';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type DicussionProps = {
  onPress: () => void;
};

const ReplyButton = (props: DicussionProps) => {
  return (
    <TouchableOpacity
      style={{
        padding: 5,
      }}
      onPress={props.onPress}>
      <IconMaterialCommunityIcons
        name="message-reply-text-outline"
        color="white"
        size={18}
      />
    </TouchableOpacity>
  );
};

export default ReplyButton;
