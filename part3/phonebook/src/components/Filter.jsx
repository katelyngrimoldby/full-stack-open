const Filter = ({ value, handleChange }) => {
  return(
    <div>
      <label htmlFor="filterInput">Fliter: </label>
      <input type="search"
        id="filterInput"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;