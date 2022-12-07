
import React, { useState } from 'react'
import GenreDropdown from './GenreDropdown'
import RangePicker from './RangePicker'
import './SearchBar.css'


const FilterMenu = ():JSX.Element => {

  return (
        <ul className="filter-menu">
          <li className="menu-item">
          <p>Filter by Year</p>
            <RangePicker/>
          </li>
          <li className="menu-item">
            <p>Filter by Genre</p>
            <GenreDropdown/>
          </li>
        </ul>

      )
}


export default FilterMenu