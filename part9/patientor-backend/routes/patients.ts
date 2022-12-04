import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res) => {
  const result = patientService.getAll();
  res.json(result);
});

export default router;