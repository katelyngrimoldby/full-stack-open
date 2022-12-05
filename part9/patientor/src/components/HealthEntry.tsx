import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { useStateValue } from "../state";
import { HealthCheckEntry } from "../types";
import HealthRatingBar from './HealthRatingBar';

type EntryProps = {
  entry: HealthCheckEntry
};

const HealthEntry = ({entry}: EntryProps) => {
  const [{diagnoses},] = useStateValue();

  return(
    <div>
      <p><b>{entry.date}</b> <MedicalInformationIcon /></p>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map(diagnosis => (
          <li key={diagnosis}>{diagnosis}: {diagnoses[diagnosis].name}</li>
        ))}
      </ul>
      <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
    </div>
  );
};

export default HealthEntry;