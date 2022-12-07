import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faFilter} from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import FilterMenu from './FilterMenu';
import './SearchBar.css'


interface ISearchInputProps {
  searchInput:string;
  searchChangeHandler:(e: React.ChangeEvent<HTMLInputElement>)=>void;
  maxRange:number[]
  filterChangeHandler:(selectedYearRange:number[])=>void
}

const SearchFilterBar = ({searchInput,searchChangeHandler,maxRange,filterChangeHandler}:ISearchInputProps):JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false)

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
          <button type="button" onClick={filterClickHandler}>
            Filter
            <FontAwesomeIcon className='icon small' icon={faFilter}/>
          </button>
        {isExpanded && 
        <FilterMenu maxRange={maxRange} filterChangeHandler={filterChangeHandler}/>}
        </div>
     
    
    </div>
      )
}


export default SearchFilterBar