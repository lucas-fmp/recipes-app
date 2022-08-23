import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">
        <img src={ drinkIcon } alt="drink" data-testid="drinks-bottom-btn" />
      </Link>

      <Link to="/foods">
        <img src={ mealIcon } alt="meal" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
