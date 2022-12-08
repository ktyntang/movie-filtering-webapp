import { useState } from 'react'
import {IMovie} from '../App'
import MovieCard from './MovieCard'
import './MovieCardList.css'
import placeholder from '../assets/placeholderImg.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark,faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons'

interface Props {
    movies: IMovie[]
  }

const emptyMovie:IMovie ={
    name: "",
    productionYear: 0,
    genre: "",
    synopsisShort:"",
    synopsis:"",
    image:""}

const MovieCardList = ({movies}:Props)=>{
    const [movieSpotlight,setMovieSpotlight] = useState<IMovie>(emptyMovie)
    const [detail,setDetail] = useState(false)
    
    const movieClickHandler =(movie:IMovie):void =>{
        setMovieSpotlight(movie)
    }
    
    // convert html string into DOM
    const parse = require('html-react-parser');
    const cleanMovieSynopsis = parse(movieSpotlight.synopsis)

    return (
        <div className='movie-card-gallery'>
            {movies.map((movie) => {
                return <MovieCard movie={movie} movieClickHandler={movieClickHandler}/>;
            })}

            {movieSpotlight.name && 
                <div className='movie-spotlight'>
                    
                    <div className='detail-panel'>
                        <div className='details'>
                            <h3>Synopsis</h3>
                            <p>{detail? cleanMovieSynopsis : movieSpotlight.synopsisShort}</p>
                        </div>

                        <div className='detail-toggle click' onClick={()=>setDetail(detail=>!detail)}>
                            {detail?'Less':'More'}
                            {detail
                            ?<FontAwesomeIcon className='icon small click' icon={faChevronUp}/>
                            :<FontAwesomeIcon className='icon small click' icon={faChevronDown}/>
                            }
                        </div>
                    </div>
                    <div className='main-panel'>
                        <img src={placeholder} alt='placeholder' height='300px'/>
                        <h1>{movieSpotlight.name}</h1>
                        <h3>{movieSpotlight.productionYear}</h3>
                        <h3>{movieSpotlight.genre}</h3>
                    </div>

                    <FontAwesomeIcon className='icon close click' icon={faXmark}
                        onClick={()=>setMovieSpotlight(emptyMovie)}/>

                </div>
            }
        </div>
        
        
    );
}

export default MovieCardList 