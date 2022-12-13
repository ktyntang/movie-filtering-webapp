import { IMovie } from '../App'
import MovieCard from './MovieCard'
import './MovieCardList.css'

// TYPES
// ---------------------------------------------------------
interface Props {
    movies: IMovie[]
    movieClickHandler: (movie: IMovie) => void
}

// COMPONENT
// ---------------------------------------------------------
const MovieCardList = ({ movies, movieClickHandler }: Props) => {

    // RENDER
    // ---------------------------------------------------------
    return (
        <div className='movie-card-gallery'>
            {movies.map((movie) => {
                return <MovieCard movie={movie} movieClickHandler={movieClickHandler} key={`${movie.name} ${movie.productionYear}`} />;
            })
            }
        </div >
    );
}

export default MovieCardList 