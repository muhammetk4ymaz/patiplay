import React from 'react';
import {Theme} from '../../../utils/theme';
import InteractionButton from '../../../views/movie/movie_detail/components/InteractionButton';
import {AddWatchListIcon, GiftIcon} from '../../../../assets/icons';

type GiftInteractionButtonProps = {
  initialValue: boolean;
  uuid: string;
  endpoint: string;
};

export const GiftInteractionButton = (props: GiftInteractionButtonProps) => {
  return (
    <InteractionButton
      icon={<GiftIcon size={Theme.iconSizes.interactionIcon} />}
      type="watchlist"
      endpoint={props.endpoint}
      value={props.initialValue}
      uuid={props.uuid}
    />
  );
};
