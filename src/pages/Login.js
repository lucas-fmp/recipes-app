import React, { useState } from 'react';
import { useHistory } from 'react-router';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const history = useHistory();
  const minPassword = 5;

  const submitLogin = () => {
    const userObj = { email };
    const userObjJSON = JSON.stringify(userObj);
    localStorage.setItem('user', userObjJSON);
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('inProgressRecipes', JSON.stringify([]));
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    history.push('/foods');
  };

  const validateButton = () => {
    if (
      email.includes('@')
      && email.length > 0
      && email.includes('.')
      && password.length > minPassword) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleChange = ({ target }) => {
    if (target.name === 'Email') {
      setEmail(target.value);
      validateButton();
    } else {
      setPassword(target.value);
      validateButton();
    }
  };

  return (
    <div>
      <form>
        <input
          name="Email"
          data-testid="email-input"
          type="email"
          placeholder="Insira seu email"
          value={ email }
          onChange={ handleChange }
        />
        <input
          name="Password"
          data-testid="password-input"
          type="password"
          placeholder="Insira sua senha"
          value={ password }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ submitLogin }
          disabled={ isDisabled }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
