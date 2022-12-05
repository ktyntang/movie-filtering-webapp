import React, { useEffect, useState } from 'react';
import './App.css';
import HeaderBar from './components/HeaderBar';
import MovieCardList from './components/MovieCardList';

export interface IMovie {
  name: string;
  productionYear: number;
  genre: string;
  synopsisShort:string;
  synopsis:string;
  image:string;
}

function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  
  useEffect(()=>{
    const fetchMovieData = async() =>{
      let res = await fetch('https://remarkable-bombolone-51a3d9.netlify.app/.netlify/functions/movies')
      let movieData = await res.json()
      setMovies(movieData)
    }

    fetchMovieData()
  },[])

  return (
    <div className="App">
      <HeaderBar/>
      <MovieCardList movies={movies}/>
    </div>
  );
}

export default App;
