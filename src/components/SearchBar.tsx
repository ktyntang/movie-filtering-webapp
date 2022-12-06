import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faFilter} from '@fortawesome/free-solid-svg-icons'
import React from 'react'


interface ISearchInputProps {
  searchInput:string;
  searchChangeHandler:(e: React.FormEvent<HTMLInputElement>)=>void
}

const SearchBar = ({searchInput,searchChangeHandler}:ISearchInputProps):JSX.Element => {
    return (
    <div className='bar'>
      <div>
        <label className='visually-hidden'>Search movies</label>
        <input type="text" placeholder="Search..." value={searchInput} onChange={searchChangeHandler}/>
        <FontAwesomeIcon className='icon small' icon={faMagnifyingGlass}/>
      </div>

      <div className='filter-menu'>
        <button type="button">
          Filter
          <FontAwesomeIcon className='icon small' icon={faFilter}/>
        </button>
        
        

      </div>

    
    </div>
      )
}


export default SearchBar