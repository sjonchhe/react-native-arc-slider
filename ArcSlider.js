import React, { Component } from 'react';
import { PanResponder, View } from 'react-native';
import PropTypes from 'prop-types';
import Svg, {
  Path,
  Circle,
  G,
  LinearGradient,
  Defs,
  Stop,
} from 'react-native-svg';

class ArcSlider extends Component {
  static PropType = {
    min: PropTypes.number,
    max: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    startColor: PropTypes.string,
    endColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    thumbR: PropTypes.number,
    thumbColor: PropTypes.string,
    thumbWrapperR: PropTypes.number,
    thumbWrapperColor: PropTypes.string,
    onChange: PropTypes.func,
    onComplete: PropTypes.func,
    children: PropTypes.node,
  };
  static defaultProps = {
    min: 45,
    max: 315,
    width: 375,
    height: 375,
    startColor: 'red',
    midColor: 'yellow',
    endColor: 'green',
    strokeWidth: 5,
    thumbR: 13,
    thumbColor: '#fdc357',
    thumbWrapperR: 18,
    thumbWrapperColor: 'rgba(80,120,149, 0.4)',
    maximumTrackColor: 'rgba(228,228,228,9.8)',
    onChange: () => {
      // console.log('change');
    },
    onComplete: () => {
      // console.log('complete');
    },
  };
  constructor(props) {
    super(props);
    this.handlePanResponderMove = this.handlePanResponderMove.bind(this);
    this.cartesianToPolar = this.cartesianToPolar.bind(this);
    this.polarToCartesian = this.polarToCartesian.bind(this);
    const { width, height, value, strokeWidth, thumbR, thumbWrapperR } = props;
    const smallestSide = Math.min(width, height);
    this.oX = undefined;
    this.oY = undefined;
    this.state = {
      cx: width / 2,
      cy: height / 2,
      value,
      r: smallestSide / 2 - Math.max(strokeWidth, thumbR, thumbWrapperR),
    };
  }
  componentWillMount = () => {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gs) => true,
      onMoveShouldSetPanResponderCapture: (e, gs) => true,
      onPanResponderGrant: () => {
        this.handleSetOriginXY();
      },
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderEnd: () => this.props.onComplete(this.state.value),
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }
  polarToCartesian(angle) {
    const { cx, cy, r } = this.state,
      a = ((angle - 270) * Math.PI) / 180.0,
      x = cx + r * Math.cos(a),
      y = cy + r * Math.sin(a);
    return { x, y };
  }
  cartesianToPolar(x, y) {
    const { cx, cy } = this.state;
    return (
      Math.round(Math.atan((cy - y) / (cx - x)) / (Math.PI / 180)) +
      (x > cx ? 270 : 90)
    );
  }
  handlePanResponderMove({ nativeEvent: { pageX, pageY } }, { moveX, moveY }) {
    try {
      const { oX, oY } = this;
      if (oX === undefined || oY === undefined) return false;
      let x = pageX - oX;
      let y = pageY - oY;
      // console.log(x, y);
      let angle = this.cartesianToPolar(x, y);
      const { min, max } = this.props;
      // console.log('move angle', angle);
      if (angle >= max) {
        // console.log('到达最大值');
        this.props.onChange && this.props.onChange(max);
      } else if (angle <= min) {
        // console.log('到达最小值');
        this.props.onChange && this.props.onChange(min);
      } else {
        this.props.onChange && this.props.onChange(angle);
      }
    } catch (error) {
      alert('圆弧滑块报错信息：' + error.message);
    }
  }
  onLayout = () => {
    this.handleSetOriginXY();
  };
  handleSetOriginXY = () => {
    this._arc.measure((x, y, w, h, px, py) => {
      this.oX = px;
      this.oY = py;
    });
  };
  render() {
    const { r, value } = this.state;
    const {
        width,
        height,
        thumbColor,
        thumbWrapperColor,
        startColor,
        midColor,
        endColor,
        maximumTrackColor,
        strokeWidth,
        thumbR,
        thumbWrapperR,
        min,
        max,
      } = this.props,
      startCoord = this.polarToCartesian(min),
      endCoord = this.polarToCartesian(value),
      maxCoord = this.polarToCartesian(max);
    return (
      <View onLayout={this.onLayout} style={this.props.style}>
        <Svg ref={(arc) => (this._arc = arc)} width={width} height={height}>
          {/* maximumTrack */}
          <Path
            stroke='url(#maxTrackColor)'
            //stroke={maximumTrackColor}
            strokeWidth={strokeWidth}
            fill='none'
            d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${
              max > 180 + min ? 1 : 0
            } 1 ${maxCoord.x} ${maxCoord.y}`}
          />
          {/* minimumTrack */}
          <Path
            //stroke="url(#minTrackColor)"
            stroke={maximumTrackColor}
            strokeWidth={strokeWidth}
            fill='none'
            //d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${value>180 + min ?1:0} 1 ${endCoord.x} ${endCoord.y}`}
            d={`M${endCoord.x} ${endCoord.y} A ${r} ${r} 1 ${
              value > 180 + min ? 0 : 1
            } 1 ${startCoord.x} ${startCoord.y}`}
          />

          <Path
            stroke={this.props.coverUpColor}
            //stroke={maximumTrackColor}
            strokeWidth={strokeWidth}
            fill='none'
            d={`M${maxCoord.x} ${maxCoord.y} A ${r} ${r} 0 ${
              max > 180 + min ? 0 : 1
            } 1 ${startCoord.x} ${startCoord.y}`}
          />

          {/* <Defs>
              <LinearGradient id="minTrackColor" x1="0" y1="0" x2="100%" y2="0">
                  <Stop offset="0" stopColor={startColor} stopOpacity="1" />
                  <Stop offset="0.5" stopColor={midColor} stopOpacity="1" />
                  <Stop offset="1" stopColor={endColor} stopOpacity="1" />
              </LinearGradient>
            </Defs> */}

          <Defs>
            <LinearGradient id='maxTrackColor' x1='0' y1='0' x2='100%' y2='0'>
              <Stop offset='0' stopColor={startColor} stopOpacity='1' />
              <Stop offset='0.5' stopColor={midColor} stopOpacity='1' />
              <Stop offset='1' stopColor={endColor} stopOpacity='1' />
            </LinearGradient>
          </Defs>
          <G
            x={endCoord.x - 7.5}
            y={endCoord.y - 7.5}
            {...this._panResponder.panHandlers}
          >
            <Circle
              cx={7.5}
              cy={7.5}
              r={thumbWrapperR + 50}
              fill='rgba(0,0,0,0)'
            />
            <Circle
              cx={7.5}
              cy={7.5}
              r={thumbWrapperR}
              fill={thumbWrapperColor}
            />
            <Circle cx={7.5} cy={7.5} r={thumbR} fill={thumbColor} />
          </G>
        </Svg>
        {this.props.children}
      </View>
    );
  }
}

export default ArcSlider;
