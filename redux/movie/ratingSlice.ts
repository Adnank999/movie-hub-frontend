
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


interface RatingState {
  ratings: { [movieId: string]: number }; 
}

const initialState: RatingState = {
  ratings: {},
};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    setRating: (state, action: PayloadAction<{ movieId: string; rating: number }>) => {
      state.ratings[action.payload.movieId] = action.payload.rating;
    },
    clearRatings: (state) => {
      state.ratings = {};
    }

  },
});

export const { setRating,clearRatings } = ratingSlice.actions;

export const selectMovieRating = (state: RootState, movieId: string) => 
  state.ratings?.ratings?.[movieId] ?? 0;

export default ratingSlice.reducer;
