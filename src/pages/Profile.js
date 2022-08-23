import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import '../styles/profile.css';

function Profile() {
  const { setTitle, setShowHeader, setSearch } = useContext(MyContext);
  const history = useHistory();
  useEffect(() => {
    setShowHeader(true);
    setTitle('Profile');
    setSearch(false);
  }, []);

  const getEmail = JSON.parse(localStorage.getItem('user'));

  const routeDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const routeFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const routeLogin = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="div-body">
      <Header />
      <section>
        <p
          className="profile-email"
          data-testid="profile-email"
        >
          {' '}
          {getEmail.email}
        </p>
        <div className="buttons-container">
          <button
            className="button-redirect"
            type="button"
            data-testid="profile-done-btn"
            onClick={ routeDoneRecipes }
          >
            Done Recipes

          </button>
          <button
            className="button-redirect"
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ routeFavoriteRecipes }
          >
            Favorite Recipes

          </button>
          <button
            className="button-redirect"
            type="button"
            data-testid="profile-logout-btn"
            onClick={ routeLogin }
          >
            Logout

          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default Profile;
