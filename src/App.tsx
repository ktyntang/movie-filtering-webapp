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
  
  // FETCH MOVIES FROM API
  useEffect(()=>{
    const fetchMovieData = () =>{
      fetch('https://remarkable-bombolone-51a3d9.netlify.app/.netlify/functions/movies')
        .then(res => {
          if (res.ok){
            return res.json()
          } else {
            throw new Error('API fetch error')}
          })
          .then((data:IMovie[]) => {
            setIsLoaded(true)
            setMovies(data)
          })
            .catch(error => {
              console.log({error})
              setError(true)
            })
      }
    fetchMovieData()
    
  },[])
  console.log(filterInput)

  useEffect(()=>{
    if (movies) {
    const stringFilteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(filterInput.searchString.toLowerCase())
    )
    const yearFilteredMovies = stringFilteredMovies.filter(movie=>
      movie.productionYear >= filterInput.productionYearSelection[0] && movie.productionYear <= filterInput.productionYearSelection[1]
      )
    
    if (filterInput.genreSelection.length === 0){
      setFilterInput({...filterInput, genreSelection: Array.from(new Set(movies?.map(movie=>movie.genre)))})
    } 

    const genreFilteredMovies = yearFilteredMovies.filter(movie=>
      filterInput.genreSelection.includes(movie.genre)
      )

    setFilteredMovies(genreFilteredMovies)}
  },[movies,filterInput])

  
  const defaultYearRange = movies?.map(movie=>movie.productionYear).sort()
  const defaultGenreOptions = Array.from(new Set(movies?.map(movie=>movie.genre)))

  const onSearchChange=(e: React.ChangeEvent<HTMLInputElement>):void=>{
    setFilterInput({...filterInput,
      searchString: e.currentTarget.value})
  }

  const onYearChange = (selectedYearRange:number[]):void=>{
    setFilterInput({...filterInput,
      productionYearSelection: selectedYearRange })
  }

  const onGenreChange = (genreSelection:string[]):void=>{
    console.log('genre changed!')
    console.log('ongenrechange app',{genreSelection})
    setFilterInput({...filterInput,
      genreSelection: genreSelection })
  }

  console.log('app')
  return (
    <div className="App">
      <HeaderBar/>
      <SearchFilterBar 
      searchInput={filterInput.searchString} searchChangeHandler={onSearchChange}
      yearRange={defaultYearRange} yearChangeHandler={onYearChange}
      defaultGenreOptions={defaultGenreOptions} genreChangeHandler={onGenreChange}
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
