const express = require("express");

const router = express.Router();

const {
  createCandidate,
  getCandidates,
  voteCandidate,
} = require("../controllers/candidateController");


// GET ALL CANDIDATES
router.get("/", getCandidates);


// CREATE CANDIDATE
router.post("/", createCandidate);


// VOTE CANDIDATE
router.put("/vote/:id", voteCandidate);


module.exports = router;
