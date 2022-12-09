import { motion } from "framer-motion"
import { useState } from 'react'
import { IMovie } from '../App'
import './MovieCardList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

interface Props {
    movieSpotlight: IMovie
    spotlightCloseHandler: () => void
}

// // convert html string into DOM
const MovieSpotlight = ({ movieSpotlight, spotlightCloseHandler }: Props) => {
    const [detail, setDetail] = useState(false)

    const parse = require('html-react-parser');
    const cleanMovieSynopsis = parse(movieSpotlight.synopsis)

    return (
        <div className="movie-spotlight-wrapper" style={{ zIndex: `${movieSpotlight.name ? '1' : '0'}` }}>
            {movieSpotlight.name &&
                <motion.div
                    key="movie-spotlight"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className='movie-spotlight' >
                        <div className='detail-panel'>
                            <div className='details'>
                                <h1>{movieSpotlight.name}</h1>
                                <h3>Synopsis</h3>
                                {detail
                                    ? <p>{cleanMovieSynopsis}</p>
                                    : <p>{movieSpotlight.synopsisShort}</p>

                                }
                            </div>

                            <div className='detail-toggle click' onClick={() => setDetail(detail => !detail)}>
                                {detail ? 'Less' : 'More'}
                                {detail
                                    ? <FontAwesomeIcon className='icon small click' icon={faChevronUp} />
                                    : <FontAwesomeIcon className='icon small click' icon={faChevronDown} />
                                }
                            </div>
                        </div>
                        <div className='main-panel'>
                            <img src={`images/${movieSpotlight.image}`} alt={`{${movieSpotlight.name} poster`}
                                height='400px' />
                            <h3>{movieSpotlight.productionYear}</h3>
                            <h3>{movieSpotlight.genre}</h3>
                        </div>

                        <FontAwesomeIcon className='icon close click' icon={faXmark}
                            onClick={() => {
                                spotlightCloseHandler()
                                setDetail(false)
                            }} />

                    </div>
                </motion.div>

            }
        </div>
    );
}

export default MovieSpotlight 