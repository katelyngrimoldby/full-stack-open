import { v1 as uuid } from 'uuid';
import data from '../data/patients';
import { Patient, CensoredPatient, NewPatient } from '../types';

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

const addPatient = (obj: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...obj
  };

  patients.concat(newPatient);

  return newPatient;
};

export default {getAll, addPatient};