import placeholder from '../assets/placeholderImg.webp'
import {IMovie} from '../App'

interface Props {
    movie: IMovie
  }

const MovieCard= ({movie}:Props):JSX.Element =>{
    return(
    <div className='movie-card'>
        <img src={placeholder} alt='placeholder' height='300px'/>
        <h3>{movie.name}</h3>
        <h3>{movie.productionYear}</h3>
    </div>
    )
}

export default MovieCard