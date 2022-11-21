import Entry from "./Entry"

const Entries = ({entries, filter}) => {
  const filterEntries = (entry) => {
    if(filter.length > 0) {
      if(entry.name.toUpperCase().includes(filter.toUpperCase())) {
        return true
      } else {
        return false
      } 
    } else {
      return true
    }
  }

  return(
    <div>
      {entries.map((entry) => {
        return filterEntries(entry) ? (<Entry key={entry.name} entry={entry} />) : null
      })}
    </div>
  )
}

export default Entries;