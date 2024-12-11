import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Theme} from '../../../utils/theme';
import CustomText from '../CustomText';

type ViewingStatsProps = {
  info: string;
  percentage: number;
};

type ContentProps = {
  info: string;
  percentage: number;
};

type ProgressProps = {
  percentage: number;
};

const ViewingStats = (props: ViewingStatsProps) => {
  return (
    <View>
      <Content info={props.info} percentage={props.percentage} />
      <Progress percentage={props.percentage} />
    </View>
  );
};

export default ViewingStats;

const Content = (props: ContentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CustomText text={props.info} style={styles.infoText} />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <CustomText
            text={props.percentage.toString()}
            weight="light"
            style={{color: 'white', fontSize: 42}}
          />
          <CustomText
            text="%"
            weight="light"
            style={{
              color: 'white',
              fontSize: 24,
              textAlignVertical: 'top',
              top: 6,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const Progress = (props: ProgressProps) => {
  return (
    <View
      style={{
        height: 6,
        marginHorizontal: Theme.paddings.viewHorizontalPadding,
      }}>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {backgroundColor: 'darkgray', borderRadius: 4},
        ]}
      />
      <LinearGradient
        colors={['#8b5cf6', '#a855f7']}
        style={[
          styles.progress,
          {
            width: `${props.percentage}%`,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'darkgray',
    borderWidth: 1.5,
    top: 2,
    marginHorizontal: Theme.paddings.viewHorizontalPadding,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 0,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    top: -2,
  },
  infoText: {color: 'white', fontSize: Theme.fontSizes.md},
  progress: {
    height: 6,
    borderRadius: 4,
  },
});
