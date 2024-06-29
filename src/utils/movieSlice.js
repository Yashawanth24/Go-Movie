import { createSlice } from "@reduxjs/toolkit";
const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVideos: null,
        popluarMovie: null,
        upcomingMovies: null,
        topratedMovies: null,
        providername:null
    },
    reducers: {
        addNowPlayingMovie: (state, action) => {
            state.nowPlayingMovies = action.payload
        },
        movieTrailer: (state, action) => {
            state.trailerVideos = action.payload
        },
        addNowPopularMovies: (state, action) => {
            state.popluarMovies = action.payload
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload
        },
        addTopRatedMovies: (state, action) => {
            state.topratedMovies = action.payload
        },
        addProviderName:(state,action)=>
            {
                state.providername=action.payload
            }
    }
});
export const { addNowPlayingMovie, movieTrailer, addNowPopularMovies, addUpcomingMovies, addTopRatedMovies,addProviderName } = movieSlice.actions;
export default movieSlice.reducer;