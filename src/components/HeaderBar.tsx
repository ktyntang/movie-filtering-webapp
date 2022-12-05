import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm} from '@fortawesome/free-solid-svg-icons'
import React from 'react'


const HeaderBar = ():JSX.Element => {
    return (
        <header className="header">
            <div className='logo'>
                <FontAwesomeIcon className='icon' icon={faFilm}/>
                <h1>Bluejay Productions</h1>
            </div>
        </header>
      )
}


export default HeaderBar