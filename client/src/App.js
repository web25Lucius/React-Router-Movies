import React, { useState, useEffect } from 'react';
import {Route, useParams} from 'react-router-dom';
import axios from 'axios';

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';



const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState ([]);

  const {id} = useParams();
 

  useEffect (() => {
    const getMovies = ()=> {
      axios
      .get(`http://localhost:5000/api/movies/`)
      .then (response => {
        setMovieList(response.data);
      })
      .catch(error => {
        console.log('ERROR!', error);
      })
    }
    getMovies();
  },[]);

  const addToSavedList = movie => {
    setSavedList( [...savedList, movie] );
  };

  return (
    <div>
      <SavedList list={savedList} />
      <Route exact path="/" > 
        <MovieList movies={movieList}/>
      </Route>
      <Route> 
        <Movie id={id}/>
      </Route>
     
    </div>
  );
};

export default App;
