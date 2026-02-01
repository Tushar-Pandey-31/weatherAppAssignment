export const loadFavorites = () => {
  try {
    const serializedState = localStorage.getItem("favorites");
    if (serializedState === null) return [];
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load favorites", err);
    return [];
  }
};

export const saveFavorites = (favorites) => {
  try {
    const serializedState = JSON.stringify(favorites);
    localStorage.setItem("favorites", serializedState);
  } catch (err) {
    console.error("Could not save favorites", err);
  }
};