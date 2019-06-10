[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

# react-native-arc-slider

React Native component for creating arc slider.

![example](https://note.youdao.com/yws/public/resource/8ca20d8051cd30d06fb6c17761f2183a/xmlnote/822F1161A7894CAA94C8C41448FC6611/12285)

# NOTICE

- react-native-svg >= 3.2.0 only supports react-native >= 0.29.0
- react-native-svg >= 4.2.0 only supports react-native >= 0.32.0
- react-native-svg >= 4.3.0 only supports react-native >= 0.33.0
- react-native-svg >= 4.4.0 only supports react-native >= 0.38.0 and react >= 15.4.0
- react-native-svg >= 4.5.0 only supports react-native >= 0.40.0 and react >= 15.4.0
- react-native-svg >= 5.1.8 only supports react-native >= 0.44.0 and react == 16.0.0-alpha.6
- react-native-svg >= 5.2.0 only supports react-native >= 0.45.0 and react == 16.0.0-alpha.12
- react-native-svg >= 5.3.0 only supports react-native >= 0.46.0 and react == 16.0.0-alpha.12
- react-native-svg >= 5.4.1 only supports react-native >= 0.47.0 and react == 16.0.0-alpha.12
- react-native-svg >= 5.5.1 only supports react-native >= 0.50.0 and react == 16.0.0

## Installation

1. Install library and react-native-svg

	```
	npm i --save react-native-arc-slider react-native-svg
	```
2. Link native code for SVG

	```
	react-native link react-native-svg
	```

## Usage

Import ArcSlider
```js
import ArcSlider from 'react-native-arc-slider';
```

Use as follows:

```js
<ArcSlider
	min={45} //最小deg
	max={315} //最大deg
	value={90} //当前deg
	onChange={}
	onComplete={}
/>
```

## Configuration

You can configure the passing by following props:

- **min**: 角度最小值
- **max**: 角度最大值
- **width**: 容器宽度
- **height**: 容器高度
- **startColor**: 渐变色起始值
- **endColor**: 渐变色结束值
- **strokeWidth**: 弧线宽度
- **thumbR**: 触点半径
- **thumbColor**: 触点背景色
- **thumbWrapperR**: 触点外圈半径
- **thumbWrapperColor**: 触点外圈背景色
- **onChange**: 值改变时触发的回调
- **onComplete**: 一次移动事件结束的回调
- **children**: 子节点

## Author

[zgatrying](https://github.com/zgatrying)

## License

MIT