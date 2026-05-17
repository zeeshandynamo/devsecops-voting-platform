const Candidate = require("../models/Candidate");

// CREATE NEW CANDIDATE
exports.createCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.create({
      name: req.body.name,
    });

    res.status(201).json(candidate);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET ALL CANDIDATES
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();

    res.status(200).json(candidates);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// VOTE FOR CANDIDATE
exports.voteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    candidate.votes += 1;

    await candidate.save();

    res.status(200).json(candidate);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// RESET ALL VOTES
exports.resetVotes = async (req, res) => {
  try {

    await Candidate.updateMany({}, { $set: { votes: 0 } });

    const candidates = await Candidate.find();

    res.status(200).json({
      message: "All votes reset successfully",
      candidates,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};
