import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavouritesState {
  favourites: Record<string, boolean>; 
}

const initialState: FavouritesState = {
  favourites: {},
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<string>) => {
      const movieId = action.payload;
      state.favourites[movieId] = !state.favourites[movieId];
    },
    setFavourite: (state, action: PayloadAction<{ id: string; isFavourite: boolean }>) => {
      const { id, isFavourite } = action.payload;
      state.favourites[id] = isFavourite;
    },
  },
});

export const { toggleFavourite, setFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;
