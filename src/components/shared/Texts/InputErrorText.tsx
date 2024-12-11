import React from 'react';
import CustomText from '../CustomText';
import {Theme} from '../../../utils/theme';

function InputErrorText({errorMessage}: {errorMessage: string}) {
  return (
    <CustomText
      text={errorMessage}
      style={{
        marginTop: 5,
        paddingHorizontal: 12,
        fontSize: Theme.fontSizes.xs,
        color: Theme.colors.error,
      }}
    />
  );
}

export default InputErrorText;
