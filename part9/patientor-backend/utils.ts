import { Gender, NewPatient } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (obj: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(obj.name, 'name'),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseString(obj.ssn, 'ssn'),
    gender: parseGender(obj.gender),
    occupation: parseString(obj.occupation, 'occupation')
  };

  return newPatient;
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

export default toNewPatient;