import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'

const SearchBar = ({ query, onSearch, onQueryChange }) => {
  function handleKeyDown(event) {
    if (event.key === "Enter") onSearch();
  }
  return (
    <div className='search-bar'>
      <input 
        type="text" 
        placeholder="Search for a city..." 
        value={query} 
        onChange={(e) => onQueryChange(e.target.value)} 
        onKeyDown={handleKeyDown} 
      />
      <button onClick={onSearch} aria-label="Search">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  )
}

export default SearchBar