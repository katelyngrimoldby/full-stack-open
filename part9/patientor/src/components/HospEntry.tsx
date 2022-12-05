import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useStateValue } from "../state";
import { HospitalEntry } from "../types";

type EntryProps = {
  entry: HospitalEntry
};

const HospEntry = ({entry}: EntryProps) => {
  const [{diagnoses},] = useStateValue();
  return(
    <div>
      <p><b>{entry.date}</b> <LocalHospitalIcon /></p>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map(diagnosis => (
          <li key={diagnosis}>{diagnosis}: {diagnoses[diagnosis].name}</li>
        ))}
      </ul>
      <p>Discharged: {entry.discharge.date}</p>
      <p>{entry.discharge.criteria}</p>
    </div>
  );
};

export default HospEntry;