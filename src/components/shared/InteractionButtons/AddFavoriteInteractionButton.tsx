import {Theme} from '../../../utils/theme';
import InteractionButton from '../../../views/movie/movie_detail/components/InteractionButton';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

type AddFavoriteInteractionButtonProps = {
  initialValue: boolean;
  uuid: string;
  endpoint: string;
};

export const AddFavoriteInteractionButton = (
  props: AddFavoriteInteractionButtonProps,
) => {
  return (
    <InteractionButton
      icon={
        <IconMaterialIcons
          name={'favorite-outline'}
          color="white"
          size={Theme.iconSizes.interactionIcon}
        />
      }
      type="favorite"
      endpoint={props.endpoint}
      value={props.initialValue}
      uuid={props.uuid}
    />
  );
};
