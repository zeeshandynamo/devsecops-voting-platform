import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [winner, setWinner] = useState("");

  const API_URL = "/api/candidates";

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(API_URL);
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const voteCandidate = async (id) => {
    try {
      await axios.put(`${API_URL}/vote/${id}`);
      fetchCandidates();
      setWinner("");
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const showWinner = () => {
    if (candidates.length === 0) {
      setWinner("No candidates available yet.");
      return;
    }

    const maxVotes = Math.max(...candidates.map((candidate) => candidate.votes));
    const winners = candidates.filter((candidate) => candidate.votes === maxVotes);

    if (winners.length > 1) {
      setWinner(`It's a tie between ${winners.map((w) => w.name).join(", ")}!`);
    } else {
      setWinner(`Congratulations ${winners[0].name} has won!`);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="app">
      <div className="hero">
        <h1>🚀 DevSecOps Voting Platform</h1>
        <p>Vote for your favorite tech giant and watch Kubernetes deliver the update live.</p>
      </div>

      <div className="card-container">
        {candidates.map((candidate) => (
          <div className="card" key={candidate._id}>
            <h2>{candidate.name}</h2>
            <p className="votes">Votes: {candidate.votes}</p>

            <button onClick={() => voteCandidate(candidate._id)}>
              Vote
            </button>
          </div>
        ))}
      </div>

      <div className="result-section">
        <button className="winner-button" onClick={showWinner}>
          Show Final Result
        </button>

        {winner && <h2 className="winner-message">{winner}</h2>}
      </div>
    </div>
  );
}

export default App;
