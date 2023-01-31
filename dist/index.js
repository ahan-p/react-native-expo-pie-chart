'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactNative = require('react-native');
var Svg = require('react-native-svg');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Svg__default = /*#__PURE__*/_interopDefaultLegacy(Svg);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

const defaultProps = {
  rotation: -90,
  length: 150,
  zeroTotalCircleColor: '#F1F6F9',
  containerProps: {},
  svgProps: {},
  gProps: {},
  circleProps: {}
};

const CircleWrapper = props => /*#__PURE__*/React__default["default"].createElement(Svg.Circle, _extends({
  cx: "50%",
  cy: "50%",
  fill: "transparent" // eslint-disable-next-line react/jsx-props-no-spreading

}, props));

const PieChartComponent = ({
  data,
  length,
  rotation,
  zeroTotalCircleColor,
  containerProps,
  svgProps,
  gProps,
  circleProps,
  aStrokeWidth,
  aStrokeLinecap
}) => {
  const {
    strokeWidth,
    radius,
    circleCircumference
  } = React.useMemo(() => {
    const newStrokeWidth = length * 0.25;
    const newRadius = length / 2 - newStrokeWidth / 2;
    return {
      strokeWidth: aStrokeWidth,//newStrokeWidth,
      radius: newRadius,
      circleCircumference: 2 * Math.PI * newRadius
    };
  }, [length]);
  const {
    total,
    filledData
  } = React.useMemo(() => { 
    //console.warn("data : "+data.replace('\\',''));
    data = data.replace('\\','');
    //data='[{"key":"Others","count":"12.76","color":"blue","id": 1},{"key":"MATIC","count":"21.14","id":2,"color":"#F44336"},{"key":"MANA","count":"18.69","id":3,"color":"#9C27B0"}]';
    const newTotal = JSON.parse(data).reduce((prev, current) => prev + parseFloat(current.count), 0);
    
    const newFilledData = JSON.parse(data).reduce((prev, current, i) => {
      const percentage = parseFloat(current.count) / parseFloat(newTotal) * 100;
     // console.warn("percentage : "+JSON.stringify(percentage)+" , newTotal : "+JSON.stringify(newTotal));
      prev.push({ ...current,
        percentage,
        strokeDashoffset: circleCircumference - circleCircumference * percentage / 100,
        angle: (i === 0 ? 0 : prev[i - 1].angle) + parseFloat(current.count) / newTotal * 360
      });
      return prev;
    }, []);
    return {
      total: newTotal,
      filledData: newFilledData
    };
  }, [circleCircumference, data]);
  return /*#__PURE__*/React__default["default"].createElement(reactNative.View, _extends({
    style: styles.container // eslint-disable-next-line react/jsx-props-no-spreading

  }, containerProps), /*#__PURE__*/React__default["default"].createElement(Svg__default["default"], _extends({
    height: length.toString(),
    width: length.toString(),
    viewBox: `0 0 ${length} ${length}` // eslint-disable-next-line react/jsx-props-no-spreading

  }, svgProps), /*#__PURE__*/React__default["default"].createElement(Svg.G, _extends({
    rotation: rotation,
    originX: length / 2,
    originY: length / 2 // eslint-disable-next-line react/jsx-props-no-spreading

  }, gProps), total === 0 ? /*#__PURE__*/React__default["default"].createElement(CircleWrapper, _extends({
    r: radius,
    stroke: zeroTotalCircleColor,
    strokeWidth: strokeWidth // eslint-disable-next-line react/jsx-props-no-spreading

  }, circleProps)) : filledData.map((item, i, arr) => /*#__PURE__*/React__default["default"].createElement(CircleWrapper, _extends({
    key: item.key,
    r: radius,
    stroke: item.color,
    strokeWidth: strokeWidth,
    strokeDasharray: circleCircumference,
    strokeDashoffset: item.strokeDashoffset,
    rotation: i === 0 ? 0 : arr[i - 1].angle,
    originX: length / 2,
    originY: length / 2,
    strokeLinecap: aStrokeLinecap // eslint-disable-next-line react/jsx-props-no-spreading

  }, circleProps))))));
};

PieChartComponent.defaultProps = defaultProps;
const PieChart = /*#__PURE__*/React__default["default"].memo(PieChartComponent);
const styles = reactNative.StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

exports["default"] = PieChart;
//# sourceMappingURL=index.js.map
