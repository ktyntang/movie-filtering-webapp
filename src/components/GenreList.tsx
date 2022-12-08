interface IGenreListProps {
  dataGenreList: string[]
  onGenreClick:(e:React.ChangeEvent<HTMLInputElement>)=>void
  filteredGenres: string[]
}

const GenreList = ({dataGenreList, onGenreClick,filteredGenres}:IGenreListProps):JSX.Element => {
  return (
    <div className='genre-list'>
      {dataGenreList.map((genre) => {
        return (

          <label>
          <input
            type="checkbox"
            name={genre}
            value={genre}
            onChange={e=>onGenreClick(e)}
            checked={filteredGenres.includes(genre)? true : false}
            />
          {genre}</label>

        )
      })}
    </div>

      )
}


export default GenreList