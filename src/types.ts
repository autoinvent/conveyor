import { CSSProperties, ReactNode } from 'react';

export interface CommonProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
}

export interface WrapperProp {
  children?: ReactNode;
}

export type DataType = Record<string, any>;
