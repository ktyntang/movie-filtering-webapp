import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import './SearchBar.css'

interface ISearchInputProps {
  searchInput:string;
  searchChangeHandler:(e: React.ChangeEvent<HTMLInputElement>)=>void;
}

const SearchBar = ({searchInput,searchChangeHandler}:ISearchInputProps):JSX.Element => {

  const focusOnInput =():void =>{
    const searchInput = document.querySelector("#search-input") as HTMLElement;
    searchInput?.focus()
  }

  return (
        <div className='search-input'>
          <label className='visually-hidden'>Search movies</label>
          <input id='search-input' type="text" placeholder="Search..." value={searchInput} onChange={searchChangeHandler}/>
          <FontAwesomeIcon className='icon small' icon={faMagnifyingGlass} onClick={focusOnInput}/>
        </div>
      )
}


export default SearchBar