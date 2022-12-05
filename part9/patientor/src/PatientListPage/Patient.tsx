// import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import axios from "axios";

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
      <h3>{patient.gender}</h3>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPage;