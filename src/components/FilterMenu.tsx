import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Range } from 'rc-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateLeft, faMinus } from '@fortawesome/free-solid-svg-icons'
import GenreList from './GenreList'
import 'rc-slider/assets/index.css';
import './SearchBar.css'

// TYPES
// ---------------------------------------------------------
interface IFilterInputProps {
  defaultYears: number[]
  yearInput: number[]
  yearChangeHandler: (selectedYearRange: number[]) => void
  defaultGenres: string[]
  genreInput: string[]
  genreChangeHandler: (genreSelection: string[]) => void
}


// COMPONENT
// ---------------------------------------------------------

const FilterMenu = ({ defaultYears, yearChangeHandler, yearInput, defaultGenres, genreInput, genreChangeHandler }: IFilterInputProps): JSX.Element => {

  // STATES
  // ---------------------------------------------------------
  const [yearRangeDisplay, setYearRangeDisplay] = useState<number[]>(yearInput)
  const [filteredGenres, setFilteredGenres] = useState<string[]>(genreInput)


  // FILTER SELECTION HANDLERS
  // ---------------------------------------------------------
  const onYearChange = (selectedYear: number[]): void => {
    setYearRangeDisplay(selectedYear)
    yearChangeHandler(selectedYear)
  }

  const onGenreClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const genreSelected = e.target.value
    const isChecked = filteredGenres.includes(genreSelected)
    let newGenreList = []
    isChecked
      ? (newGenreList = filteredGenres.filter(genre =>
        genre !== genreSelected))
      : (newGenreList = filteredGenres.concat([genreSelected]))

    setFilteredGenres(newGenreList)
    genreChangeHandler(newGenreList)
  }


  // RENDER
  // ---------------------------------------------------------
  const min: number = defaultYears?.[0]
  const max: number = defaultYears?.[defaultYears.length - 1]

  return (
    <motion.ul
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "300%" }}
    >
      <ul className="filter-menu" title='filter-menu'>
        <li className="filter-item year">
          <div className='menu-header'>
            <p>Filter by Year</p>
            <FontAwesomeIcon className='icon small click' icon={faArrowRotateLeft}
              onClick={() => { onYearChange([min, max]) }} />
          </div>
          <Range className='click' defaultValue={[min, max]} min={min} max={max}
            value={yearRangeDisplay} onChange={(selectedYear) => onYearChange(selectedYear)} />
          <div className='range-display'>
            <h5>{yearRangeDisplay[0] ?? 'MIN'}</h5>
            <FontAwesomeIcon className='icon small' icon={faMinus} />
            <h5>{yearRangeDisplay[1] ?? 'MAX'}</h5>
          </div>
        </li>

        <li className="filter-item genre">
          <div className='menu-header'>
            <p>Filter by Genre</p>
            <FontAwesomeIcon className='icon small click' icon={faArrowRotateLeft}
              onClick={() => {
                setFilteredGenres(defaultGenres)
                genreChangeHandler(defaultGenres)
              }} />
          </div>
          <GenreList defaultGenres={defaultGenres} onGenreClick={onGenreClick} filteredGenres={filteredGenres} />
        </li>
      </ul>

    </motion.ul >
  )
}


export default FilterMenu