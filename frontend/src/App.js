import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [candidates, setCandidates] = useState([]);

  const API_URL = "/api/candidates";

  // FETCH CANDIDATES
  const fetchCandidates = async () => {
    try {
      const response = await axios.get(API_URL);
      setCandidates(response.data);

    } catch (error) {
      console.error(error);
    }
  };


  // VOTE FUNCTION
  const voteCandidate = async (id) => {
    try {
      await axios.put(`${API_URL}/vote/${id}`);

      fetchCandidates();

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchCandidates();
  }, []);


  return (
    <div className="container">

      <h1>🚀 DevSecOps Voting Platform</h1>

      <div className="card-container">

        {candidates.map((candidate) => (

          <div className="card" key={candidate._id}>

            <h2>{candidate.name}</h2>

            <p>Votes: {candidate.votes}</p>

            <button onClick={() => voteCandidate(candidate._id)}>
              Vote
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;
