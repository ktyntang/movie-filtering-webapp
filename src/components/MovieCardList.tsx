import {IMovie} from '../App'
import MovieCard from './MovieCard'

interface Props {
    movies: IMovie[]
  }

const MovieCardList = ({movies}:Props)=>{
    return (
        <div className='movie-card-gallery'>
            {movies.map((movie) => {
            return <MovieCard movie={movie}/>;
            })}
        </div>
    );
}

export default MovieCardList 