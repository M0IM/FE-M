import React from 'react';
import {SvgProps} from 'react-native-svg';
import DefaultIconIcon from '../../../assets/icons/DefaultIcon.svg';

type TSvgIconProps = SvgProps & {
  size?: number;
};
const DefaultIcon = ({
  fill,
  width: _width,
  height: _height,
  size,
  ...props
}: TSvgIconProps) => {
  const width = _width ?? size;
  const height = _height ?? size;
  const sizeProps = {
    ...(width !== undefined ? {width} : {}),
    ...(height !== undefined ? {height} : {}),
  };

  return <DefaultIconIcon {...props} fill={fill} {...sizeProps} scaleX={1} />;
};

export default DefaultIcon;
