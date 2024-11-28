import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../../../../components/shared/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import {Theme} from '../../../../constants/Theme';
import DateLabel from '../../../../components/shared/DateLabel';
import SoldOutLabel from '../../../../components/shared/SoldOutLabel';
import OverlayView from '../../../../components/shared/OverlayView';

type Props = {
  posterPath: string;
  index: number;
};

const CampaignsTitleCard = (props: Props) => {
  return (
    <View
      style={{
        aspectRatio: 2000 / 3000,
        width:
          (Dimensions.get('window').width -
            2 * Theme.paddings.viewHorizontalPadding -
            36) /
          4,
        borderRadius: 12,
        justifyContent: 'flex-end',
      }}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${props.posterPath}`,
        }}
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: 12,
          },
        ]}
      />
      {props.index % 5 === 2 ? (
        <DateLabel
          date="DAY"
          month="LAST"
          backgroundColor="rgba(255, 0, 0,0.5)"
          dateFontSize={8}
          monthFontSize={8}
        />
      ) : (
        props.index % 5 !== 3 && (
          <DateLabel
            date="19"
            month="MAR"
            backgroundColor="rgba(17, 24, 39,0.5)"
            dateFontSize={10}
            monthFontSize={8}
          />
        )
      )}

      {props.index % 5 === 3 && <SoldOutLabel />}
      {props.index % 5 === 3 && <OverlayView />}
    </View>
  );
};

export default React.memo(CampaignsTitleCard);

const styles = StyleSheet.create({});
