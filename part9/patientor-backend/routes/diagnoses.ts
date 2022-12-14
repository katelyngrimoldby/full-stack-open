import express from "express";
import diagnosesService from "../services/diagnosisService";

const router = express.Router();

router.get('/', (_req, res) => {
  const result = diagnosesService.getAll();
  res.json(result);
});


export default router;