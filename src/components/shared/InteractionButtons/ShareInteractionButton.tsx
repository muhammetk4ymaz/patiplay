import React from 'react';
import {Theme} from '../../../utils/theme';
import InteractionButton from '../../../views/movie/movie_detail/components/InteractionButton';
import {AddWatchListIcon, GiftIcon, ShareIcon} from '../../../../assets/icons';

type ShareInteractionButtonProps = {
  initialValue: boolean;
  uuid: string;
  endpoint: string;
};

export const ShareInteractionButton = (props: ShareInteractionButtonProps) => {
  return (
    <InteractionButton
      icon={<ShareIcon size={Theme.iconSizes.interactionIcon} />}
      type="watchlist"
      endpoint={props.endpoint}
      value={props.initialValue}
      uuid={props.uuid}
    />
  );
};
