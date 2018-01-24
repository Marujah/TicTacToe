import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Zell from './Zell';
import Player from './Player';

let playedZells = []

export default class Main extends Component {
  constructor(props){
    super(props);
    this.onCheckGameStatus = this.onCheckGameStatus.bind(this);
    this.getAllWinComb = this.getAllWinComb.bind(this);
    let allzells = [
                    {index: 0, val:''},
                    {index: 1, val:''},
                    {index: 2, val:''},
                    {index: 3, val:''},
                    {index: 4, val:''},
                    {index: 5, val:''},
                    {index: 6, val:''},
                    {index: 7, val:''},
                    {index: 8, val:''}
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
  botPlays (playedZell) {
    playedZells.push(playedZell);
    let data = this.state.allZells.filter((item) => playedZells.indexOf(item.index) === -1);
    let randomIndex = Math.floor(Math.random()*(data.length+1));
    data[randomIndex].val = 'O';
    let newZells = this.state.allZells;
    newZells.find((i) => i.index === data)
    // newZells[randomIndex].val='O';
    // let freeBotZell = data.find((zell) => zell.index === randomIndex).val='O';
    this.setState({allZells:newZells});
  }
  onCheckGameStatus (index) {
    let winningCombinations = ['012', '036', '048','345','678','147','258','246'];
    let data = this.state.player;
    data.push(index);
    let allZellsData = this.state.allZells;
    allZellsData[index].val='X';
    this.setState({player: data, allZells: allZellsData});
    // this.botZells.push(index);   
    if(this.state.player.length >= 3) {
      // get all 3 combis from state player
      let allComb = this.getAllComb(this.state.player);
      // check if one of them is in allwinningComb
      if (allComb.some( (item) => { return this.getAllWinComb(winningCombinations).indexOf(item.join('')) !== -1; })) {
          // player wins
          alert('Player wins'); 
      } else {
        this.botPlays(index);
      }
      // otherwise lets bot plays  
        // get Free zells
        // this.state.player

      
      // check if bot wins

    } else this.botPlays(index)
  }
  render() {
    return (
        <View style={styles.container}>
          {this.state.allZells.map((zell,i) => 
            <Zell key={zell.index} index={zell.index} value={zell.val} checkGameStatus={this.onCheckGameStatus}/>
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
