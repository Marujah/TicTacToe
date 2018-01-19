import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';

export default class Zell extends Component {
  constructor(){
    super();
    this.state = {active: true, char: ''};
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ char: nextProps.value })
    }
  }
  handleClick(){
   if (this.state.active) {
     this.setState({active: false, char: 'X'})
     this.props.botplays(this.props.index);
   }
  }
  render() {
    return(
      <View>
        <TouchableHighlight  onPress={this.handleClick} style={styles.zell}>
        <Text style={{fontSize: 40}}>{this.state.char}</Text></TouchableHighlight>
      </View>
    );
  }  
}

const styles = StyleSheet.create({
  zell: {
    backgroundColor: 'orange', 
    width: 100, 
    height: 100, 
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});