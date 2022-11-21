const Entry = ({entry}) => {
  return <p key={entry.name}>{entry.name}: {entry.number}</p>
}

export default Entry;