const Entry = ({ entry, handleClick }) => {
  return(
    <div>
      <span key={entry.name}>{entry.name}: {entry.number}</span>
      <button onClick={() => handleClick(entry.id)}>Delete</button>
    </div>
  ) ;
};

export default Entry;