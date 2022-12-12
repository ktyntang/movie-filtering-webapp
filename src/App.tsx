import React, { useEffect, useState } from "react";
import FilterContainer from "./components/FilterContainer";
import HeaderBar from "./components/HeaderBar";
import MovieCardList from "./components/MovieCardList";
import MovieSpotlight from "./components/MovieSpotlight";
import SearchBar from "./components/SearchBar";
import Loader from "./components/Loader";
import retryPromise from "./utils/retryPromise";
import "./App.css";


export interface IMovie {
  name: string;
  productionYear: number;
  genre: string;
  synopsisShort: string;
  synopsis: string;
  image: string;
}

interface IFilterParams {
  searchString: string;
  productionYearSelection: number[];
  genreSelection: string[];
}

const emptyMovie: IMovie = {
  name: "",
  productionYear: 0,
  genre: "",
  synopsisShort: "",
  synopsis: "",
  image: ""
}

function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    searchString: "",
    productionYearSelection: [],
    genreSelection: [],
  });

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [movieSpotlight, setMovieSpotlight] = useState<IMovie>(emptyMovie)

  const movieClickHandler = (movie: IMovie): void => {
    setMovieSpotlight(movie)
  }
  const spotlightCloseHandler = (): void => {
    setMovieSpotlight(emptyMovie)
  }

  // FETCH MOVIES FROM API WITH RETRIES
  // ---------------------------------------------------------
  useEffect(() => {
    retryPromise(() =>
      fetch(
        "https://remarkable-bombolone-51a3d9.netlify.app/.netlify/functions/movies"
      ),
      {
        retryIf: (response: Response) => true, // you could check before trying again
        retries: 5,
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("API fetch error");
      }
    })
      .then((data: IMovie[]) => {
        setMovies(data);
        setIsLoaded(true);

        //SET DEFAULT MIN MAX RANGES FOR FILTERS
        // ---------------------------------------------------------
        const dataYearRange = data
          .map((movie) => movie.productionYear)
          .sort();

        setFilterParams({
          searchString: "",
          productionYearSelection: [
            dataYearRange[0],
            dataYearRange[dataYearRange.length - 1]
          ],
          genreSelection: Array.from(
            new Set(data.map((movie) => movie.genre))
          ),
        });
      })
      .catch((error) => {
        setError(true);
      });
  }, []);


  //FILTER MOVIES BASED ON USER INPUT
  // ---------------------------------------------------------
  useEffect(() => {
    if (movies) {
      const newFilteredMovies = movies.filter(
        (movie) =>
          movie.name.toLowerCase()
            .includes(filterParams.searchString.toLowerCase())
          &&
          movie.productionYear >=
          filterParams.productionYearSelection[0]
          &&
          movie.productionYear <=
          filterParams.productionYearSelection[1]
          &&
          filterParams.genreSelection
            .includes(movie.genre)
      );
      setFilteredMovies(newFilteredMovies);
    }
  }, [movies, filterParams]);



  // SEARCH AND FILTER HANDLERS
  // ---------------------------------------------------------
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterParams({
      ...filterParams,
      searchString: e.currentTarget.value,
    });
  };

  const onYearChange = (selectedYearRange: number[]): void => {
    setFilterParams({
      ...filterParams,
      productionYearSelection: selectedYearRange,
    });
  };

  const onGenreChange = (genreSelection: string[]): void => {
    setFilterParams({
      ...filterParams,
      genreSelection: genreSelection,
    });
  };

  // ---------------------------------------------------------

  const defaultYears = movies?.map((movie) => movie.productionYear).sort();
  const defaultGenres = Array.from(
    new Set(movies?.map((movie) => movie.genre))
  );

  return (
    <div className="App">
      <HeaderBar />

      <div className="search bar">
        <SearchBar
          searchInput={filterParams.searchString}
          searchChangeHandler={onSearchChange}
        />
        <FilterContainer
          defaultYears={defaultYears}
          yearInput={filterParams.productionYearSelection}
          yearChangeHandler={onYearChange}
          defaultGenres={defaultGenres}
          genreInput={filterParams.genreSelection}
          genreChangeHandler={onGenreChange}
        />
      </div>

      <div className="main">
        {error && (
          <div>
            <p>
              Sorry something went wrong. Please refresh the page
              to reload movies.
            </p>
            <button onClick={() => window.location.reload()}>
              Refresh
            </button>
          </div>
        )}
        {!error && !isLoaded && <Loader />}
        {!error && isLoaded && filteredMovies.length > 0 && (
          <div>
            <MovieSpotlight movieSpotlight={movieSpotlight} spotlightCloseHandler={spotlightCloseHandler} />
            <MovieCardList movies={filteredMovies} movieClickHandler={movieClickHandler} />
          </div>
        )}
        {!error && isLoaded && filteredMovies && !filteredMovies.length && (
          <div>No movies found</div>
        )}
      </div>
    </div>
  );
}

export default App;
