import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence } from "framer-motion"
import { useState } from 'react'
import FilterMenu from './FilterMenu';
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
const FilterContainer = ({ defaultYears, yearInput, yearChangeHandler, defaultGenres, genreInput, genreChangeHandler }: IFilterInputProps): JSX.Element => {

  // STATES
  // ---------------------------------------------------------
  const [isExpanded, setIsExpanded] = useState<boolean>(false)


  // BUTTON CLICK HANDLER
  // ---------------------------------------------------------
  const filterClickHandler = (): void => {
    setIsExpanded(isExpanded => !isExpanded)
  }

  // RENDER
  // ---------------------------------------------------------
  return (
    <div className='filter-input'>
      <button className='click' type="button" title='toggle-filter-menu' onClick={filterClickHandler} >
        Filter
        <FontAwesomeIcon className='icon small' icon={faFilter} />
      </button>
      <AnimatePresence>
        {isExpanded &&
          <FilterMenu
            defaultYears={defaultYears} yearInput={yearInput} yearChangeHandler={yearChangeHandler}
            defaultGenres={defaultGenres} genreInput={genreInput} genreChangeHandler={genreChangeHandler} />
        }
      </AnimatePresence>
    </div>
  )
}


export default FilterContainer