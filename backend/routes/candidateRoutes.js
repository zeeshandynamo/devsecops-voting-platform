const express = require("express");

const router = express.Router();

const {
  createCandidate,
  getCandidates,
  voteCandidate,
  resetVotes,
} = require("../controllers/candidateController");

// GET ALL CANDIDATES
router.get("/", getCandidates);

// CREATE CANDIDATE
router.post("/", createCandidate);

// VOTE CANDIDATE
router.put("/vote/:id", voteCandidate);

// RESET ALL VOTES
router.put("/reset", resetVotes);

module.exports = router;
