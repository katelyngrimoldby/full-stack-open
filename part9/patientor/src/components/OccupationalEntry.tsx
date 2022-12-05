import WorkIcon from '@mui/icons-material/Work';
import { useStateValue } from "../state";
import { OccupationalHealthcareEntry } from "../types";

type EntryProps = {
  entry: OccupationalHealthcareEntry
};

const OccupationalEntry = ({entry}: EntryProps) => {
  const [{diagnoses},] = useStateValue();

  return(
    <div>
      <p><b>{entry.date}</b> <WorkIcon /></p>
      <p>Employer: {entry.employerName}</p>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map(diagnosis => (
          <li key={diagnosis}>{diagnosis}: {diagnoses[diagnosis].name}</li>
        ))}
      </ul>
      {entry.sickLeave && (
        <div>
          <p>Sick leave began: {entry.sickLeave.startDate}</p>
          <p>Sick leave ends: {entry.sickLeave.endDate}</p>
        </div>
      )}
    </div>
  );
};

export default OccupationalEntry;