import {AddListIcon} from '../../../../assets/icons';
import {Theme} from '../../../utils/theme';
import InteractionButton from '../../../views/movie/movie_detail/components/InteractionButton';

type AddMyListIntereactionButtonProps = {
  initialValue: boolean;
  uuid: string;
  endpoint: string;
};

export const AddMyListIntereactionButton = (
  props: AddMyListIntereactionButtonProps,
) => {
  return (
    <InteractionButton
      icon={<AddListIcon size={Theme.iconSizes.interactionIcon} />}
      type="list"
      endpoint={props.endpoint}
      value={props.initialValue}
      uuid={props.uuid}
    />
  );
};
