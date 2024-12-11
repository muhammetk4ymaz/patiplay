import {Dimensions} from 'react-native';
import {Theme} from './theme';

const width = Dimensions.get('window').width;
const gap = Theme.spacing.columnGap;
const padding = Theme.paddings.viewHorizontalPadding;

export const calculateGridItemWidth = (numColumns: number) => {
  return (width - 2 * padding - (numColumns - 1) * gap) / numColumns;
};
