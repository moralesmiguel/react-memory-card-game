import React, { Component } from 'react';


class CardReveal extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.props.matched && !this.props.imageUp) {
      this.props.onClick(this.props.id,this.props.image);      
    }
  }

  render() {
    let imagePath = './img/';
    if (this.props.imageUp) {
      imagePath = imagePath + this.props.image + '.png';
    } else {
      imagePath = imagePath + 'back.png';
    }

    let className='Card';
    if (this.props.matched) {
      className = className + ' Matched';
    }

    return (
        <img className={className} src={require(`${imagePath}`)} alt='' onClick={this.handleClick}/>
    );      
  };
};

export default CardReveal;