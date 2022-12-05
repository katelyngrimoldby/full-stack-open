import { Gender, NewPatient, HealthCheckRating, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (obj: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(obj.name, 'name'),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseString(obj.ssn, 'ssn'),
    gender: parseGender(obj.gender),
    occupation: parseString(obj.occupation, 'occupation'),
    entries: []
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (obj: any): NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthcareEntry => {

  const newEntry = {
    description: parseString(obj.description, 'description'),
    date:parseDate(obj.date),
    specialist: parseString(obj.specialist, 'specialist'),
    diagnosisCodes: parseDiagnoses(obj.diagnosisCodes)
  };

  switch(obj.type) {
    case 'HealthCheck':
      const newHealthCheckEntry: NewHealthCheckEntry = {
        ...newEntry,
        type: 'HealthCheck',
        healthCheckRating: parseRating(obj.healthCheckRating)
      };
      return newHealthCheckEntry;
    case 'Hospital':
      const newHospitalEntry: NewHospitalEntry = {
        ...newEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(obj.discharge.date),
          criteria: parseString(obj.discharge.criteria, 'Discharge criteria')
        }
      };
      return newHospitalEntry;
    case 'OccupationalHealthcare':
      const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
        ...newEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString(obj.employerName, 'Employer name'),
        sickLeave: obj.sickLeave ? {
          startDate: parseDate(obj.sickLeave.startDate),
          endDate: parseDate(obj.sickLeave.endDate)
        } : undefined
      };
      return newOccupationalHealthcareEntry;
    default:
      throw new Error('Missing or incorrect entry type');
  }
};

// field parsers
const parseString = (string: unknown, key: string): string => {
  if(!string || !(isString(string))) {
    throw new Error(`Incorrect or missing parameter: ${key}`);
  }

  return string;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

const parseRating = (rating: unknown): HealthCheckRating => {
  if(!rating || !isRating(rating)) {
    throw new Error('Incorrect or missing rating');
  }

  return rating;
};

const parseDiagnoses = (arr: unknown): string[] => {
  if(!arr || !Array.isArray(arr)) {
    throw new Error('Incorrect or missing Diagnoses');
  }

  return arr.map((e: unknown): string => parseString(e, "diagnosis"));
};

// field validators
const isString = (string: unknown): string is string => {
  return typeof string === 'string' || string instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};