
import React, { useEffect, useState } from 'react'
import GenreList from './GenreList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRotateLeft,faMinus} from '@fortawesome/free-solid-svg-icons'
import './SearchBar.css'
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';

interface IFilterInputProps {
  yearRange:number[]  
  yearChangeHandler:(selectedYearRange:number[])=>void;
  defaultGenreOptions:string[]
  genreChangeHandler:(genreSelection:string[])=>void
}

const FilterMenu = ({yearRange,yearChangeHandler,defaultGenreOptions, genreChangeHandler}:IFilterInputProps):JSX.Element => {
  
  const min:number = yearRange?.[0]
  const max:number = yearRange?.[yearRange.length-1]

  const [yearRangeDisplay,setYearRangeDisplay] = useState<number[]>([min,max])
  const [filteredGenres,setFilteredGenres] = useState<string[]>(defaultGenreOptions)

  const onYearChange = (selectedYear:number[]):void=>{
    setYearRangeDisplay(selectedYear)
    yearChangeHandler(selectedYear)
  }

  const onGenreClick = (e:React.ChangeEvent<HTMLInputElement>):void => {
      const genreSelected = e.target.value
      const isChecked = filteredGenres.includes(genreSelected)
      let newGenreList =[]
      isChecked 
      ? (newGenreList = filteredGenres.filter(genre =>
          genre !== genreSelected))
      : (newGenreList = filteredGenres.concat([genreSelected]))
      
      setFilteredGenres(newGenreList)
      genreChangeHandler(newGenreList)}


  return (
        <ul className="filter-menu">

          <li className="filter-item year">
            <div className='menu-header'>
              <p>Filter by Year</p>
              <FontAwesomeIcon className='icon small click' icon={faArrowRotateLeft}
              onClick={()=>{onYearChange([min,max])}}/>
            </div>
            {yearRange && 
              <Range className='click' defaultValue={[min, max]} min={min} max={max}
              value={yearRangeDisplay} onChange={(selectedYear)=>onYearChange(selectedYear)}/>
            }
             <div className='range-display'>
                <h5>{yearRangeDisplay[0]??'MIN'}</h5>
                <FontAwesomeIcon className='icon small' icon={faMinus}/>
                <h5>{yearRangeDisplay[1]??'MAX'}</h5>
            </div>
          </li>

          <li className="filter-item genre">
          <div className='menu-header'>
              <p>Filter by Genre</p>
              <FontAwesomeIcon className='icon small click' icon={faArrowRotateLeft}
              onClick={()=>{
                setFilteredGenres(defaultGenreOptions)
                genreChangeHandler(defaultGenreOptions)}}/>
            </div>
            <GenreList defaultGenreOptions={defaultGenreOptions} onGenreClick={onGenreClick} filteredGenres={filteredGenres}/>
          </li>
        </ul>
      )
}


export default FilterMenu