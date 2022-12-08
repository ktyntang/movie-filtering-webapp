import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faFilter} from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import FilterMenu from './FilterMenu';
import './SearchBar.css'

interface ISearchInputProps {
  searchInput:string;
  searchChangeHandler:(e: React.ChangeEvent<HTMLInputElement>)=>void;
  yearRange:number[]
  yearChangeHandler:(selectedYearRange:number[])=>void
  defaultGenreOptions:string[]
  genreChangeHandler:(genreSelection:string[])=>void
}

const SearchFilterBar = ({searchInput,searchChangeHandler,yearRange,yearChangeHandler,defaultGenreOptions,genreChangeHandler}:ISearchInputProps):JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const filterClickHandler = ():void =>{
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
          <button type="button" onClick={filterClickHandler} >
            Filter
            <FontAwesomeIcon className='icon small' icon={faFilter}/>
          </button>
        {isExpanded && 
        <FilterMenu yearRange={yearRange} defaultGenreOptions={defaultGenreOptions} yearChangeHandler={yearChangeHandler} genreChangeHandler={genreChangeHandler}/>}
        </div>
     
    
    </div>
      )
}


export default SearchFilterBar