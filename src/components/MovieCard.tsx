import placeholder from '../assets/placeholderImg.webp'
import {IMovie} from '../App'

interface Props {
    movie: IMovie
    movieClickHandler:(movie:IMovie)=>void
  }

const MovieCard= ({movie,movieClickHandler}:Props):JSX.Element =>{
    return(
    <div className='movie-card click' onClick={()=>movieClickHandler(movie)}>
        <img src={placeholder} alt='placeholder' height='350px'/>
        <div className='card-header'>
        <h3>{movie.name}</h3>
        <h3>{movie.productionYear}</h3>
        </div>
    </div>
    )
}

export default MovieCard