import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faFilter} from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import FilterMenu from './FilterMenu';


interface ISearchInputProps {
  searchInput:string;
  searchChangeHandler:(e: React.FormEvent<HTMLInputElement>)=>void
}

const SearchBar = ({searchInput,searchChangeHandler}:ISearchInputProps):JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false)

  const filterClickHandler = ():void =>{
    console.log('click')
    setIsExpanded(isExpanded=>!isExpanded)
  }

  const focusOnInput =():void =>{
    const searchInput = document.querySelector("#search-input") as HTMLElement;
    searchInput?.focus()
  }

  return (
    <div className='bar search'>
        <div className='search-input'>
          <label className='visually-hidden'>Search movies</label>
          <input id='search-input' type="text" placeholder="Search..." value={searchInput} onChange={searchChangeHandler}/>
          <FontAwesomeIcon className='icon small' icon={faMagnifyingGlass} onClick={focusOnInput}/>
        </div>
        
        <div className='filter-input'>
          <button type="button" onClick={filterClickHandler}>
            Filter
            <FontAwesomeIcon className='icon small' icon={faFilter}/>
          </button>
        {/* isExpanded && */}
        <FilterMenu/>
        </div>
     
    
    </div>
      )
}


export default SearchBar