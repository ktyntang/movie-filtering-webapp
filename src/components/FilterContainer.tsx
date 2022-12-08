import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFilter} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import FilterMenu from './FilterMenu';
import './SearchBar.css'

interface IFilterInputProps {
  defaultYears:number[]
  yearInput:number[]
  yearChangeHandler:(selectedYearRange:number[])=>void
  defaultGenres:string[]
  genreInput:string[]
  genreChangeHandler:(genreSelection:string[])=>void
}

const FilterContainer = ({defaultYears,yearInput,yearChangeHandler,defaultGenres,genreInput,genreChangeHandler}:IFilterInputProps):JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const filterClickHandler = ():void =>{
    setIsExpanded(isExpanded=>!isExpanded)
  }


  return (
        <div className='filter-input'>
          <button className='click' type="button" onClick={filterClickHandler} >
            Filter
            <FontAwesomeIcon className='icon small' icon={faFilter}/>
          </button>
        {isExpanded && 
        <FilterMenu 
        defaultYears={defaultYears} yearInput={yearInput} yearChangeHandler={yearChangeHandler}
        defaultGenres={defaultGenres} genreInput={genreInput} genreChangeHandler={genreChangeHandler}/>}
        </div>
      )
}


export default FilterContainer