declare module '*.png'

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: Rect.Fc<SvgProps>
  export default content
}