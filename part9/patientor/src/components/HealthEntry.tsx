import { HealthCheckEntry } from "../types";

type EntryProps = {
  entry: HealthCheckEntry
};

const HealthEntry = ({entry}: EntryProps) => {
  return(
    <div>
      <p>{entry.date}</p>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map(diagnosis => (
          <li key={diagnosis}>{diagnosis}</li>
        ))}
      </ul>
    </div>
  );
};

export default HealthEntry;