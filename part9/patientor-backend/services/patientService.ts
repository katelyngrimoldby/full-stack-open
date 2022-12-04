import data from '../data/patients.json';
import { Patient, CensoredPatient } from '../types';

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

export default {getAll};