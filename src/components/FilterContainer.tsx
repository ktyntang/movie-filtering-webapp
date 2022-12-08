import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFilter} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import FilterMenu from './FilterMenu';
import './SearchBar.css'

interface IFilterInputProps {
  dataYearRange:number[]
  yearInput:number[]
  yearChangeHandler:(selectedYearRange:number[])=>void
  dataGenreList:string[]
  genreInput:string[]
  genreChangeHandler:(genreSelection:string[])=>void
}

const FilterContainer = ({dataYearRange,yearInput,yearChangeHandler,dataGenreList,genreInput,genreChangeHandler}:IFilterInputProps):JSX.Element => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const filterClickHandler = ():void =>{
    setIsExpanded(isExpanded=>!isExpanded)
  }


  return (
        <div className='filter-input'>
          <button type="button" onClick={filterClickHandler} >
            Filter
            <FontAwesomeIcon className='icon small' icon={faFilter}/>
          </button>
        {isExpanded && 
        <FilterMenu 
        dataYearRange={dataYearRange} yearInput={yearInput} yearChangeHandler={yearChangeHandler}
        dataGenreList={dataGenreList} genreInput={genreInput} genreChangeHandler={genreChangeHandler}/>}
        </div>
      )
}


export default FilterContainer