
import { apiSlice } from '../apiSlice';

export const movieApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPopularMovies: builder.query({

      query: () => (
        {
          url: 'movies',
          method: 'GET',
        }
      ), 
      providesTags: (result, error, arg) =>
        
        result
        ? [
            ...result.map(({ _id }) => ({ type: 'Movie' as const, id: _id })),
            { type: 'Movie', id: 'LIST' }, 
          ]
        : [{ type: 'Movie', id: 'LIST' }],
  
    }),
    
    addMovie: builder.mutation({
      query: (newMovie) => ({      
        url: 'movies',
        method: 'POST',
        body: newMovie,
      }),
      invalidatesTags: ['Movie']
    }),
    addRating: builder.mutation({
      query: ({ movieId, rating }) => ({
        url: `movies/${movieId}/rate`,
        method: "POST",
        body: { rating },
      }),
      invalidatesTags: ['Movie']
    }),
    

  }),
  overrideExisting: false,
});

export const { useGetPopularMoviesQuery,useAddMovieMutation,useAddRatingMutation } = movieApi;
