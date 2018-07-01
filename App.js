import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

// You can import from local files
import Main from './components/Main';

// or any pure javascript modules available in npm
// import { Card } from 'react-native-elements'; // 0.18.5

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{paddingTop: 150}}>
          <Main allZells={[..."123456789"]} winningCombinations={['012', '036', '048','345','678','147','258','246']}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    //backgroundColor: '#ecf0f1',
  }
});
