import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function CardDoneRecipes() {
  const [linkCopied, setLinkCopied] = useState(false);
  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];

  return (

    <div>
      {/* {console.log(doneRecipes[0].tags)} */}

      {
        doneRecipes.map((item, index) => (
          <div key={ index }>
            <div>
              <Link to={ `/${item.type}s/${item.id}` }>
                <img
                  src={ item.image }
                  alt={ item.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
            </div>

            <div>
              {item.type === 'food' && (
                <h4 data-testid={ `${index}-horizontal-top-text` }>
                  {`${item.nationality} - ${item.category}`}
                </h4>
              )}
              {item.type === 'drink' && (
                <h4 data-testid={ `${index}-horizontal-top-text` }>
                  {item.alcoholicOrNot}
                </h4>
              )}

              {
                linkCopied === true && <p>Link copied!</p>
              }

              <button
                type="button"
                onClick={ () => {
                  const url = `http://localhost:3000/${item.type}s/${item.id}`;
                  clipboardCopy(url);
                  setLinkCopied(true);
                } }
              >
                <img
                  src={ shareIcon }
                  alt="share icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
            </div>

            <Link to={ `/${item.type}s/${item.id}` }>
              <h3 data-testid={ `${index}-horizontal-name` }>
                {item.name }
              </h3>
            </Link>

            <p data-testid={ `${index}-horizontal-done-date` }>
              {`Done in: ${item.doneDate}`}
            </p>

            {/* {
              item.tags && item.tags.map((tag) => (
                <h5
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ `${index}-${tag}` }
                >
                  {tag}
                </h5>))
            } */}

          </div>
        ))
      }
    </div>

  );
}

export default CardDoneRecipes;
