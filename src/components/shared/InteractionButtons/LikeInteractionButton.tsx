import {LikeIcon} from '../../../../assets/icons';
import {Theme} from '../../../utils/theme';
import InteractionButton from '../../../views/movie/movie_detail/components/InteractionButton';

type LikeInteractionButtonProps = {
  initialValue: boolean;
  uuid: string;
  endpoint: string;
};

export const LikeInteractionButton = (props: LikeInteractionButtonProps) => {
  return (
    <InteractionButton
      type="like"
      endpoint={props.endpoint}
      icon={<LikeIcon size={Theme.iconSizes.interactionIcon} />}
      value={props.initialValue}
      uuid={props.uuid}
    />
  );
};
