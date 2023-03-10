import React from 'react';
import { ViewProps } from 'react-native';
import { SvgProps, CircleProps, GProps } from 'react-native-svg';
export declare type dataItem = {
    color: string;
    count: number;
    key: string;
};
declare const defaultProps: {
    rotation: number;
    length: number;
    zeroTotalCircleColor: string;
    containerProps: {};
    svgProps: {};
    gProps: {};
    circleProps: {};
};
export declare type PieChartProps = {
    data: dataItem[];
    length?: number;
    rotation?: number;
    zeroTotalCircleColor?: string;
    containerProps?: ViewProps;
    svgProps?: SvgProps;
    gProps?: GProps;
    circleProps?: CircleProps;
} & typeof defaultProps;
declare const PieChart: React.NamedExoticComponent<PieChartProps>;
export default PieChart;
