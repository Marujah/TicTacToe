import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Player extends Component {
  constructor(props){
    super(props);
    this.state = {onturn : false};
  }
  render() {
    return(
      <View>
        <Text style={this.props.name ? styles.playeron : styles.playeroff}>Player: {this.props.name ? 'X' : 'Bot'}</Text>
      </View>
    );
  }  
}

const styles = StyleSheet.create({
  playeron: {
    color: 'orange'
  },
  playeroff: {
    color: 'red'
  },
});