import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Zell from './Zell';
import Player from './Player';

let playedZells = [];
let botPlayedZells = [];

export default class Main extends Component {
  constructor(props){
    super(props);
    this.onCheckGameStatus = this.onCheckGameStatus.bind(this);
    this.getAllWinComb = this.getAllWinComb.bind(this);
    let allzells = [
                    {index: 0, val:'', active: true},
                    {index: 1, val:'', active: true},
                    {index: 2, val:'', active: true},
                    {index: 3, val:'', active: true},
                    {index: 4, val:'', active: true},
                    {index: 5, val:'', active: true},
                    {index: 6, val:'', active: true},
                    {index: 7, val:'', active: true},
                    {index: 8, val:'', active: true}
                  ]
    this.state = {player:[], bot:[], allZells:allzells}
  }
  componentDidMount(){
    Array.prototype.move = function (old_index, new_index) {
      if (new_index >= this.length) {
          var k = new_index - this.length;
          while ((k--) + 1) {
              this.push(undefined);
          }
      }
      this.splice(new_index, 0, this.splice(old_index, 1)[0]);
      return this; // for testing purposes
    };
  }
  getAllComb(input) {
    var results = [], result, mask, i, total = Math.pow(2, input.length);
    for (mask = 3; mask < total; mask++) {
        result = [];
        i = input.length - 1;
        do {
            if ((mask & (1 << i)) !== 0) {
              result.push(input[i]);
            }
        } while (i--);

        if (result.length === 3) {
          results.push(result);
        }
    }
    return results;
  }
  getAllWinComb(input){
    let result = [];
    input.map((item,i) => {
      result.push(item); // 0,1,2
      result.push([...item].move(2,1).join('')); // 0,2,1
      result.push([...item].move(1,0).join('')); // 1,0,2
      result.push([...item].move(1,0).move(1,2).join('')); // 1,2,0
      result.push([...item].move(2,0).join('')); // 2,1,0 
      result.push([...item].move(2,0).move(1,2).join('')); // 2,0,1 
    });
    return result; 
  }
  generateRandomIndex(length){  
    return  Math.floor(Math.random()*length)
  }
  resetStates() {
    playedZells = [];
      botPlayedZells = [];
      this.setState({player:[], bot:[], allZells:[
        {index: 0, val:'', active: true},
        {index: 1, val:'', active: true},
        {index: 2, val:'', active: true},
        {index: 3, val:'', active: true},
        {index: 4, val:'', active: true},
        {index: 5, val:'', active: true},
        {index: 6, val:'', active: true},
        {index: 7, val:'', active: true},
        {index: 8, val:'', active: true}
      ]});
  }
  isWinner(playedZells,player) {
    if(playedZells.length>2) {
      let allComb = this.getAllComb(playedZells);
      if (allComb.some( (item) => { return this.getAllWinComb(this.props.winningCombinations).indexOf(item.join('')) !== -1; })) {
        alert(player + ' win(s)');
        return true;
      }
    }
    return false;
  }
  botPlays (playedZell) {
    playedZells.push(playedZell);
    let data = this.state.allZells.filter((item) => playedZells.indexOf(item.index) === -1);
    let randomIndex = this.generateRandomIndex(data.length);
    while (!data[randomIndex].active) {
      randomIndex = this.generateRandomIndex(data.length);
    }
    data[randomIndex].val = 'O';
    data[randomIndex].active = false;
    let newZells = this.state.allZells;
    this.setState({allZells:newZells});
    botPlayedZells.push(randomIndex);
    // check if bot wins
    if (this.isWinner(botPlayedZells, 'Bot')) this.resetStates();
  }
  onCheckGameStatus (index) {
    // let winningCombinations = ['012', '036', '048','345','678','147','258','246'];
    let data = this.state.player;
    data.push(index);
    let allZellsData = this.state.allZells;
    allZellsData[index].val='X';
    allZellsData[index].active=false;
    this.setState({player: data, allZells: allZellsData});

    if (this.isWinner(this.state.player, 'Player')) {
      this.resetStates();
    } else {
      this.botPlays(index);
    }  
    if (this.state.player.length === 5 && !this.isWinner(this.state.player, 'Player') && !this.isWinner(botPlayedZells, 'bot') ) {  
      alert('Draw');this.resetStates();
    }
  }
  render() {
    return (
        <View style={styles.container}>
          {this.state.allZells.map((zell,i) => 
            <Zell key={zell.index} index={zell.index} value={zell.val} active={zell.active} checkGameStatus={this.onCheckGameStatus}/>
          )}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
