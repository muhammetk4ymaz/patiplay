import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme} from '../../../../utils/theme';
import OverlayView from '../../../../components/shared/OverlayView';
import DateLabel from '../../../../components/shared/Labels/DateLabel';
import SoldOutLabel from '../../../../components/shared/Labels/SoldOutLabel';
import {calculateGridItemWidth} from '../../../../utils/calculateGridItemWidth';
import FastImage from 'react-native-fast-image';
import {CampaignModel} from '../../../../models/patiplay/CampaignModel';

type Props = {
  item: CampaignModel;
  index: number;
};

const CampaignsTitleCard = (props: Props) => {
  console.log('CampaignsTitleCard', props.item);
  return (
    <View
      style={{
        aspectRatio: Theme.aspectRatios.vertical,
        width: calculateGridItemWidth(4),
        borderRadius: Theme.titlePosterRadius,
        justifyContent: 'flex-end',
      }}>
      <FastImage
        source={{
          uri: props.item.title.verticalPhotos[0].url,
        }}
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: Theme.titlePosterRadius,
          },
        ]}
      />

      {isToday(props.item.endDate) ? (
        <DateLabel
          day="DAY"
          month="LAST"
          backgroundColor="rgba(255, 0, 0,0.5)"
          dateFontSize={8}
          monthFontSize={8}
        />
      ) : (
        <DateLabel
          day={formatDate(props.item.endDate).day}
          month="MAR"
          backgroundColor="rgba(17, 24, 39,0.5)"
          dateFontSize={10}
          monthFontSize={8}
        />
      )}

      {props.index % 5 === 3 && <SoldOutLabel />}
      {props.index % 5 === 3 && <OverlayView />}
    </View>
  );
};

export default React.memo(CampaignsTitleCard);

const styles = StyleSheet.create({});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.toLocaleDateString('en-GB', {day: '2-digit'}).toUpperCase();
  const month = date
    .toLocaleDateString('en-GB', {month: 'short'})
    .toUpperCase();
  return {day, month};
};

const isToday = (dateString: string) => {
  const givenDate = new Date(dateString);
  const today = new Date();

  return (
    givenDate.getDate() === today.getDate() &&
    givenDate.getMonth() === today.getMonth() &&
    givenDate.getFullYear() === today.getFullYear()
  );
};
