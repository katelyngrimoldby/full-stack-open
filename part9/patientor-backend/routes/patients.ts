import express from "express";
import patientService from "../services/patientService";
import {toNewPatient, toNewEntry} from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
  const result = patientService.getAll();
  res.json(result);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getOne(id);

  if(patient) {
    return res.json(patient);
  }
  return res.status(404).end();
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
  } catch(error) {
    if(error instanceof Error) {
      res.status(400).json({error: error.message});
    }
  } 
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.getOne(req.params.id);
  if(patient) {
    try {
      const newEntry = toNewEntry(req.body);
      const addedEntry = patientService.addEntry(patient, newEntry);
      return res.json(addedEntry);
    } catch(error) {
      if(error instanceof Error) {
        return res.status(400).json({error: error.message});
      }
    } 
  }
  return res.status(404).end();
});

export default router;