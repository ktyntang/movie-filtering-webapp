import React, { useEffect, useState } from 'react';
import './App.css';
import HeaderBar from './components/HeaderBar';
import MovieCardList from './components/MovieCardList';
import SearchFilterBar from './components/SearchFilterBar';

export interface IMovie {
  name: string;
  productionYear: number;
  genre: string;
  synopsisShort:string;
  synopsis:string;
  image:string;
}

export interface IFilterParams {
  searchString:string;
  productionYearSelection: number[];
  genreSelection: string[];
}


function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [filterInput, setFilterInput] = useState<IFilterParams>({
    searchString:"",
    productionYearSelection: [1500,3000],
    genreSelection: []
  });
  const [filteredMovies, setFilteredMovies] = useState(movies)
  
  useEffect(()=>{
    const fetchMovieData = () =>{
      fetch('https://remarkable-bombolone-51a3d9.netlify.app/.netlify/functions/movies')
        .then(res => {
          if (res.ok){
            return res.json()
          } else {
            throw new Error('API fetch error')}
          })
        .then(data => {
          setIsLoaded(true)
          setMovies(data)
        })
        .catch(error => {
          console.log({error})
          setError(true)
        }
      )
    }
    fetchMovieData()
  },[])

  useEffect(()=>{
    if (movies) {
    const stringFilteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(filterInput.searchString.toLowerCase())
    )
    const yearFilteredMovies = stringFilteredMovies.filter(movie=>
      movie.productionYear >= filterInput.productionYearSelection[0] && movie.productionYear <= filterInput.productionYearSelection[1]
      )
    setFilteredMovies(yearFilteredMovies)}
  },[movies,filterInput])

  const onSearchChange=(e: React.ChangeEvent<HTMLInputElement>):void=>{
    setFilterInput({...filterInput,
      searchString: e.currentTarget.value})
  }

  const onFilterChange = (selectedYearRange:number[]):void=>{
    setFilterInput({...filterInput,
      productionYearSelection: selectedYearRange })
  }

  const maxRange = movies?.map(movie=>movie.productionYear).sort()
  
  return (
    <div className="App">
      <HeaderBar/>
      <SearchFilterBar 
      searchInput={filterInput.searchString} searchChangeHandler={onSearchChange}
      maxRange={maxRange} filterChangeHandler={onFilterChange}
      />
      {error && <p>Sorry something went wrong. Please refresh the page to reload movies.</p>}
      {!error && !isLoaded && <p>Loading...</p>}
      {!error && isLoaded && !!filteredMovies.length &&
      <MovieCardList movies={filteredMovies}/>}
      {!error && isLoaded && !filteredMovies.length && 
      <div>No movies found</div>}
    </div>
  );
}

export default App;
