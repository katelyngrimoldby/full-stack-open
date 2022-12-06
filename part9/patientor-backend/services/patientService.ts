import { v1 as uuid } from 'uuid';
import data from '../data/patients';
import { Patient, CensoredPatient, NewPatient, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry } from '../types';

const patients: Patient[] = data;

const getAll = (): CensoredPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getOne = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);

  return patient;
};

const addPatient = (obj: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...obj
  };

  patients.concat(newPatient);

  return newPatient;
};

const addEntry = (patient: Patient, entry: NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthcareEntry): Patient => {
  const newEntry = {
    ...entry,
    id: uuid()
  };

  const updatedPatient = {
    ...patient,
    entries: patient.entries.concat(newEntry)
  };
  const index = patients.indexOf(patient);
  patients[index] = updatedPatient;
  return updatedPatient;
};

export default {getAll, addPatient, getOne, addEntry};