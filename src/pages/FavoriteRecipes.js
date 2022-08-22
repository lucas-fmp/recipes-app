import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function FavoriteRecipes() {
  const { setTitle, setShowHeader, setSearch } = useContext(MyContext);
  useEffect(() => {
    setShowHeader(true);
    setTitle('Favorite Recipes');
    setSearch(false);
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default FavoriteRecipes;
