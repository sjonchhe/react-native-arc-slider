/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ArcSlider from './ArcSlider'

export default class App extends Component {
  state = {
    value: 90
  }
  render() {
    return (
      <View style={styles.container}>
        <ArcSlider
        min={45}
        max={315}
        value={this.state.value}
        onChange={(value) =>  this.setState({value})}
        style={{
          backgroundColor: '#fff',
        }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
