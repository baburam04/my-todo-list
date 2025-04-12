import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <FiSearch className="search-icon" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search checklists..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;