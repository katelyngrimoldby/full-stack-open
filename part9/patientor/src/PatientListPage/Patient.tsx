import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import HospEntry from "../components/HospEntry";
import OccupationalEntry from "../components/OccupationalEntry";
import HealthEntry from "../components/HealthEntry";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const PatientPage = () => {
const [{ patients }, dispatch] = useStateValue();
const [patient, setPatient] = useState<Patient | undefined>();
const {id} = useParams<{id: string}>();

useEffect(() => {
  const fetchPatient = async (id: string) => {
    try {
      const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

      dispatch(updatePatient(patient));

      setPatient(patient);
    } catch(e) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);

      }
    }
  };

  if(id) {
    if(Object.keys(patients).length > 0) {
      if(patients[id]) {
        if(patients[id].ssn) {
          setPatient(patients[id]);
        } else {
          void fetchPatient(id);
        }
        
      }
    }
    
  }
}, [dispatch, Object.keys(patients).length]);

if(!patient) {
  return null;
}
  return(
    <div>
      <h1>{patient.name}</h1>
      <h2>{patient.gender}</h2>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>Entries</h3>
      {patient.entries && patient.entries.map(entry => {
        switch (entry.type) {
          case 'Hospital':
            return <HospEntry entry={entry} />;
          case 'OccupationalHealthcare':
            return <OccupationalEntry entry={entry} />;
          case 'HealthCheck':
            return <HealthEntry entry={entry} />;
          default:
            assertNever(entry);
        }
      })}
      {(patient.entries && patient.entries.length === 0) && (<p>No entries</p>)}
    </div>
  );
};

export default PatientPage;