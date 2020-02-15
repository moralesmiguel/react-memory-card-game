import React, { Component } from 'react';

class MemoryCards extends Component{
  constructor() {
    super();
    this.cards = [];
    this.imageQuantity = 7;
  }

  generateCardSet() {
    // Generate a set of cards with image pairs and then mix them up using the Durstenfeld Shuffle
    this.cards = [];
    let id=1;
    for(let i=1; i <= this.imageQuantity; i++) {
      let card1 = {
        id: id,
        image : i,
        imageUp: false,
        matched: false
      };
      id++;
      let card2 = {
        id: id,
        image : i,
        imageUp: false,
        matched: false
      };
      this.cards.push(card1);
      this.cards.push(card2);
      id++;
    }

    function shuffleArray(cards) {
      for (let i = cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cards[i], cards[j]] = [cards[j], cards[i]];
      }
    }
    shuffleArray(this.cards);
  }

  getCard(id) {
    for(let i=0; i < 2*this.imageQuantity; i++) {
      if (this.cards[i].id === id) {
        return this.cards[i];
      }
    };
  }

  flipCard(id, imageUp) {
    this.getCard(id).imageUp = imageUp;
  }

  setCardAsMatched(id, matched) {
    this.getCard(id).matched = matched;
  }

  cardsAreTheSame(id1, id2) {
    if (this.getCard(id1).image === this.getCard(id2).image) {
      return true;
    } else {
      return false;
    }
  }

};

export default MemoryCards;

