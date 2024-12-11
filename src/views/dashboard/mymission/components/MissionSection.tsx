import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import LinearGradient from 'react-native-linear-gradient';
import {Theme} from '../../../../utils/theme';
import FlagComponent from '../../../../components/shared/FlagComponent';
import CustomText from '../../../../components/shared/CustomText';

const SPACING = 10;

type MissionSectionProps = {
  country: string;
  genre: string;
  duration: string;
  type: string;
  countryCode: string;
};

const MissionSection = (props: MissionSectionProps) => {
  const headerHeight = useHeaderHeight();

  const BlurredBackground = () => {
    return (
      <Image
        source={{
          uri: `https://flagpedia.net/data/flags/h80/${props.countryCode?.toLowerCase()}.png`,
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={25}
      />
    );
  };

  return (
    <View
      style={{
        gap: SPACING,
        borderColor: '#FFD700',
        paddingTop: headerHeight,
      }}>
      <BlurredBackground />
      <LinearGradient
        colors={[
          'rgba(0,0,0,0)',
          'rgba(0,0,0,0.3)',
          'rgba(0,0,0,0.5)',
          'rgba(0,0,0,0.8)',
          'rgba(0,0,0,1)',
        ]}
        style={[StyleSheet.absoluteFillObject]}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: SPACING * 2,
          alignItems: 'center',
          paddingHorizontal: Theme.paddings.viewHorizontalPadding,
          paddingTop: 24,
          paddingBottom: 150,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
          }}>
          <View
            style={{
              elevation: 5,
              height: 45,
              width: 45,
              borderRadius: 45 / 2,
              shadowColor: '#000',
              shadowOpacity: 1,
              shadowOffset: {width: 2, height: 2},
              backgroundColor: 'white',
            }}>
            <FlagComponent isoCode={props.countryCode} width={45} height={45} />
          </View>
          <View>
            <CustomText
              text={`${props.country}\n${props.genre}\n${props.type}`}
              style={{
                color: 'white',
                fontSize: Theme.fontSizes.sm,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: Theme.colors.sambucus,
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 6,
            elevation: 5,
          }}>
          <CustomText
            text={`After ${props.duration},\nthis category\ncounts as 0m all day long!`}
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: Theme.fontSizes.xs,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default MissionSection;

const styles = StyleSheet.create({});
