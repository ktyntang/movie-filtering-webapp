import React, { useEffect, useState } from 'react';
import './App.css';
import HeaderBar from './components/HeaderBar';
import MovieCardList from './components/MovieCardList';
import SearchBar from './components/SearchBar';

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
  const [searchInput, setSearchInput] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies)
  
  useEffect(()=>{
    const fetchMovieData = async() =>{
      let res = await fetch('https://remarkable-bombolone-51a3d9.netlify.app/.netlify/functions/movies')
      let movieData = await res.json()
      setMovies(movieData)
    }
    fetchMovieData()
  },[])

  useEffect(()=>{
    if (movies.length) {
    const newFilteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    setFilteredMovies(newFilteredMovies)}
  },[movies,searchInput])

  const onSearchChange=(e: React.FormEvent<HTMLInputElement>):void=>{
    setSearchInput(e.currentTarget.value)
  }

  return (
    <div className="App">
      <HeaderBar/>
      <SearchBar searchInput={searchInput} searchChangeHandler={onSearchChange}/>
      <MovieCardList movies={filteredMovies}/>
    </div>
  );
}

export default App;
