
import React, { useState } from 'react'
import GenreDropdown from './GenreDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRotateLeft,faMinus} from '@fortawesome/free-solid-svg-icons'
import './SearchBar.css'
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

interface IFilterInputProps {
  maxRange:number[]  
  filterChangeHandler:(selectedYearRange:number[])=>void
}

const FilterMenu = ({maxRange,filterChangeHandler}:IFilterInputProps):JSX.Element => {
  
  const min:number = maxRange?.[0]
  const max:number = maxRange?.[maxRange.length-1]

  const [yearRangeDisplay,setYearRangeDisplay] = useState<number[]>([min,max])

  const onFilterChange = (values:number[]):void=>{
    setYearRangeDisplay(values)
    filterChangeHandler(values)
  }
  
  return (
        <ul className="filter-menu">

          <li className="filter-item year">
            <div className='menu-header'>
              <p>Filter by Year</p>
              <FontAwesomeIcon className='icon small click' icon={faArrowRotateLeft}
              onClick={()=>{onFilterChange([min,max])}}/>
            </div>
            {maxRange && 
              <Range className='click' defaultValue={[min, max]} min={min} max={max}
              value={yearRangeDisplay} onChange={(values)=>onFilterChange(values)}/>
            }
             <div className='range-display'>
                <h5>{yearRangeDisplay[0]??'MIN'}</h5>
                  <FontAwesomeIcon className='icon small' icon={faMinus}/>
                <h5>{yearRangeDisplay[1]??'MAX'}</h5>
            </div>
          </li>

          <li className="filter-item genre">
            <p>Filter by Genre</p>
            <GenreDropdown/>
          </li>
        </ul>
      )
}


export default FilterMenu