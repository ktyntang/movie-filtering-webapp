import { motion } from "framer-motion"
import { IMovie } from '../App'
import { ReactElement, useState } from "react"

// TYPES
// ---------------------------------------------------------
interface Props {
    movie: IMovie
    movieClickHandler: (movie: IMovie) => void
}

// COMPONENT
// ---------------------------------------------------------
const MovieCard = ({ movie, movieClickHandler }: Props): ReactElement => {

    // STATES
    // ---------------------------------------------------------
    const [imgLoaded, setImgLoaded] = useState(false)

    // RENDER
    // ---------------------------------------------------------
    return (
        <div className='movie-card click' onClick={() => movieClickHandler(movie)}>
            <motion.div
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}>
                {!imgLoaded
                    ? <svg width="233" height="350">
                        <rect width="233" height="350" rx="10" ry="10" fill="#CCC" />
                    </svg>
                    : null}
                <img src={`images/${movie.image}`} alt={`{${movie.name} poster`}
                    height='350px'
                    style={!imgLoaded ? { visibility: 'hidden', width: 0 } : {}}
                    onLoad={() => setImgLoaded(true)}
                />
                <div className='card-header'>
                    <h3>{movie.name}</h3>
                    <h3>{movie.productionYear}</h3>
                </div>
            </motion.div>
        </div>
    )
}

export default MovieCard