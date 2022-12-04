import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
  const result = patientService.getAll();
  res.json(result);
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

export default router;