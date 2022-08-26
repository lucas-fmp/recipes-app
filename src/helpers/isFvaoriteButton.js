import React from 'react';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

const isFavoritedButton = (favorite) => {
  if (favorite === false) {
    return (<img src={ whiteHeart } alt="favorite icon" data-testid="favorite-btn" />);
  } if (favorite === true) {
    return (<img src={ blackHeart } alt="favorite icon" data-testid="favorite-btn" />);
  }
};

export default isFavoritedButton;
