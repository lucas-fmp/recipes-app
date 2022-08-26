const verificaFavoriteButton = (id) => {
  const arrayFavoriteRecipes = localStorage.getItem('favoriteRecipes');
  if (arrayFavoriteRecipes === null) {
    return false;
  }
  const arrayFavoritesParsed = JSON.parse(arrayFavoriteRecipes);
  const arrayVerifica = arrayFavoritesParsed.filter((e) => e.id === id);
  return (arrayVerifica.length === 1);
};

export default verificaFavoriteButton;
