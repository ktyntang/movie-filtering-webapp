
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMinus} from '@fortawesome/free-solid-svg-icons'
import './SearchBar.css'

// interface IRangePickerProps {
//   genreList: string[]
// }

const RangePicker = ():JSX.Element => {

  return (
    <div className='range-picker'>
      <label className='visually-hidden'>Min Year</label>
      <input type="text" placeholder="MIN" value=''/>
        <p><FontAwesomeIcon className='icon small' icon={faMinus}/></p>
      <label className='visually-hidden'>Max Year</label>
      <input type="text" placeholder="MAX" value=''/>
  </div>
      )
}


export default RangePicker