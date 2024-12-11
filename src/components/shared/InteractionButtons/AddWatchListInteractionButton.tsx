import React from 'react';
import {Theme} from '../../../utils/theme';
import InteractionButton from '../../../views/movie/movie_detail/components/InteractionButton';
import {AddWatchListIcon} from '../../../../assets/icons';

type AddWatchListInteractionButtonProps = {
  initialValue: boolean;
  uuid: string;
  endpoint: string;
};

export const AddWatchListInteractionButton = (
  props: AddWatchListInteractionButtonProps,
) => {
  return (
    <InteractionButton
      icon={<AddWatchListIcon size={Theme.iconSizes.interactionIcon} />}
      type="watchlist"
      endpoint={props.endpoint}
      value={props.initialValue}
      uuid={props.uuid}
    />
  );
};
