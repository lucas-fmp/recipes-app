import React, { useState } from 'react';
<<<<<<< HEAD
import { useHistory } from 'react-router';
=======
>>>>>>> e174a38 (Resolvendo conflitos)

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
  const [isDisabled, setDisabled] = useState(true);
  const history = useHistory();
  const minPassword = 5;

  const submitLogin = () => {
    const userObj = { email };
    const userObjJSON = JSON.stringify(userObj);
    localStorage.setItem('user', userObjJSON);
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
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

=======
>>>>>>> e174a38 (Resolvendo conflitos)
  return (
    <div>
      <form>
        <input
<<<<<<< HEAD
          name="Email"
=======
>>>>>>> e174a38 (Resolvendo conflitos)
          data-testid="email-input"
          type="email"
          placeholder="Insira seu email"
          value={ email }
<<<<<<< HEAD
          onChange={ handleChange }
        />
        <input
          name="Password"
=======
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
>>>>>>> e174a38 (Resolvendo conflitos)
          data-testid="password-input"
          type="password"
          placeholder="Insira sua senha"
          value={ password }
<<<<<<< HEAD
          onChange={ handleChange }
=======
          onChange={ ({ target }) => setPassword(target.value) }
>>>>>>> e174a38 (Resolvendo conflitos)
        />
        <button
          type="button"
          data-testid="login-submit-btn"
<<<<<<< HEAD
          onClick={ submitLogin }
          disabled={ isDisabled }
=======
          onClick={ () => {} }
>>>>>>> e174a38 (Resolvendo conflitos)
        >
          Enter

        </button>
      </form>
    </div>
  );
}

export default Login;
