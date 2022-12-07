import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm} from '@fortawesome/free-solid-svg-icons'
import React from 'react'


const HeaderBar = ():JSX.Element => {
    return (
        <header className="bar header">
                <FontAwesomeIcon className='icon' icon={faFilm}/>
                <h1>BluejayProductions</h1>
        </header>
      )
}


export default HeaderBar