import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function DoneRecipes() {
  const { setTitle, setShowHeader, setSearch } = useContext(MyContext);
  useEffect(() => {
    setShowHeader(true);
    setTitle('Done Recipes');
    setSearch(false);
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default DoneRecipes;
