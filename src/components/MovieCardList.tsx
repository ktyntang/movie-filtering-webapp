import { IMovie } from '../App'
import MovieCard from './MovieCard'
import './MovieCardList.css'

interface Props {
    movies: IMovie[]
    movieClickHandler: (movie: IMovie) => void
}

const MovieCardList = ({ movies, movieClickHandler }: Props) => {
    return (
        <div className='movie-card-gallery'>
            {movies.map((movie) => {
                return <MovieCard movie={movie} movieClickHandler={movieClickHandler} />;
            })
            }
        </div >
    );
}

export default MovieCardList 