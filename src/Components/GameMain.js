import React, { Component } from 'react';
import './style.css';
import CardReveal from './CardReveal';
import MemoryCards from './MemoryCards';


class GameMain extends Component {
  constructor(props) {
    super(props);
    this.helpButton = this.helpButton.bind(this);
    this.onCardClicked = this.onCardClicked.bind(this);
    this.onPlayAgain = this.onPlayAgain.bind(this);
    this.memoryCards = new MemoryCards();
  }

  helpButton(){
    alert("Feeling lost?\n1. Cards are shuffled at the beginning and when you decide to play another game.\n2.The goal is to memorize the card's position and match the seven pairs in the least possible tries or beat your own record.\n3.If the cards selected don't match they will flip back over in 2 seconds.\n4.If the cards match they will stay flipped and marked.\n5.The game ends when you pair all cards.");
  }
//Kicks initGame, which sets everything to reset values, this way it gets set both when rendered and when button to play again is clicked
  componentWillMount() {
    this.initGame();
  }

  initGame() {
    this.memoryCards.generateCardSet();
    this.setState({
      turnNo : 1,
      pairsFound : 0,
      numClicksWithinTurn : 0,
      firstId : undefined,
      secondId : undefined
    });
  }

  getCardViews() {
    let cardViews = [];
    let onClick = this.onCardClicked;
    this.memoryCards.cards.forEach(c => {
      let cardView = <CardReveal key={c.id} 
          id={c.id} 
          image={c.image}
          imageUp = {c.imageUp}
          matched = {c.matched} 
          onClick={onClick}/>;
          cardViews.push(cardView);
    });
    return cardViews;
  }

  clearCards(id1,id2) {
    if (this.state.numClicksWithinTurn !== 2) {
      return;
    }
    this.memoryCards.flipCard(this.state.firstId, false);
    this.memoryCards.flipCard(this.state.secondId, false);
    this.setState({
      firstId: undefined,
      secondId: undefined,
      numClicksWithinTurn: 0,
      turnNo : this.state.turnNo+1
    });
  }

  onCardClicked(id,image) {
    if (this.state.numClicksWithinTurn === 0 || this.state.numClicksWithinTurn === 2) {
      if (this.state.numClicksWithinTurn === 2) {
        clearTimeout(this.timeout);
        this.clearCards(this.state.firstId, this.state.secondId);        
      }
      this.memoryCards.flipCard(id, true);
      this.setState({
        firstId : id,
        numClicksWithinTurn : 1
      });
    } else if (this.state.numClicksWithinTurn === 1) {
      this.memoryCards.flipCard(id, true);
      this.setState({
        secondId : id,
        numClicksWithinTurn : 2
      });

      if (this.memoryCards.cardsAreTheSame(id, this.state.firstId)) {
        this.memoryCards.setCardAsMatched(this.state.firstId, true);
        this.memoryCards.setCardAsMatched(id, true);
        this.setState({
          pairsFound: this.state.pairsFound+1,
          firstId: undefined,
          secondId: undefined,
          turnNo : this.state.turnNo+1,
          numClicksWithinTurn: 0
        });

      } else {
        this.timeout = setTimeout(() => { 
          this.clearCards(this.state.firstId, this.state.secondId);
        },2000); 
      }

    }
  }

  onPlayAgain() {
    this.initGame();
  }

  render() {
    let cardViews = this.getCardViews();
    let gameStatus = <div className='Game-status'>
                      <div>Turn: {this.state.turnNo}</div>
                      <div>Pairs found: {this.state.pairsFound}</div>
                    </div>;

    if (this.state.pairsFound === this.memoryCards.imageQuantity) {
      gameStatus = <div className='Game-status'>
                    <div>YOU DID IT!</div>
                    <div>You used {this.state.turnNo-1} turns</div>
                    <div><button onClick={this.onPlayAgain}>Beat your record, play again</button></div></div>;      
    }

    return (
      <div className='Game'>
        <header className='Game-header'>
          <div className='Game-title'>Match-the-Logos: A Memory Game</div>
          <button className='Help-Button' onClick={this.helpButton}>Help</button>
        </header>
        <div>
          {gameStatus}
        </div>
        <div className='CardContainer'>
          {cardViews}
        </div>
      </div>
    );
  }
}

export default GameMain;