export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Diagnosis['code'][]
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge: {
    date: string
    criteria: string
  }
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

export interface EntryForm extends BaseEntry {
  type: "Hospital" | "HealthCheck" | "OccupationalHealthcare"
  healthCheckRating: HealthCheckRating;
  discharge: {
    date: string
    criteria: string
  }
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;