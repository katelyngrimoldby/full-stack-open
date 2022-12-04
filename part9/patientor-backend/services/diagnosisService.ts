import data from '../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = data;

const getAll = () => {
  return diagnoses;
};

export default {getAll};