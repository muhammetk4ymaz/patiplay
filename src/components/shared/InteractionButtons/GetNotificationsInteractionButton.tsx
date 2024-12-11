import {Theme} from '../../../utils/theme';
import InteractionButton from '../../../views/movie/movie_detail/components/InteractionButton';
import IconIonicons from 'react-native-vector-icons/Ionicons';

type GetNotificationsInteractionButtonProps = {
  initialValue: boolean;
  uuid: string;
  endpoint: string;
};

export const GetNotificationsInteractionButton = (
  props: GetNotificationsInteractionButtonProps,
) => {
  return (
    <InteractionButton
      icon={
        <IconIonicons
          name="notifications-outline"
          size={Theme.iconSizes.interactionIcon}
          color={'white'}
        />
      }
      type="notification"
      endpoint={props.endpoint}
      value={props.initialValue}
      uuid={props.uuid}
    />
  );
};
