import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div>
      <form>
        <input
          data-testid="email-input"
          type="email"
          placeholder="Insira seu email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Insira sua senha"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ () => {} }
        >
          Enter

        </button>
      </form>
    </div>
  );
}

export default Login;
