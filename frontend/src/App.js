import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "/api/candidates";

const companyLogos = {
  Google: "https://cdn.simpleicons.org/google",
  Amazon: "https://cdn.simpleicons.org/amazon/FF9900",
  Microsoft: "https://cdn.simpleicons.org/microsoft/5E5E5E",
  NVIDIA: "https://cdn.simpleicons.org/nvidia/76B900",
  Meta: "https://cdn.simpleicons.org/meta/0866FF",
  Apple: "https://cdn.simpleicons.org/apple/000000",
  Netflix: "https://cdn.simpleicons.org/netflix/E50914",
  Tesla: "https://cdn.simpleicons.org/tesla/CC0000",
  Salesforce: "https://cdn.simpleicons.org/salesforce/00A1E0",
  Adobe: "https://cdn.simpleicons.org/adobe/FF0000",
};

function App() {
  const [candidates, setCandidates] = useState([]);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(API_URL);
      setCandidates(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const voteCandidate = async (id) => {
    try {
      await axios.put(`${API_URL}/vote/${id}`);
      fetchCandidates();
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const showWinner = () => {
    if (candidates.length === 0) {
      setWinner("No candidates available");
      return;
    }

    const topCandidate = candidates.reduce((max, candidate) =>
      candidate.votes > max.votes ? candidate : max
    );

    setWinner(`Congratulations ${topCandidate.name} has won!`);
  };

  return (
    <div className="app">
      <div className="hero-section">
        <h1>DevSecOps Voting Platform</h1>
        <p>
          Vote for your favorite tech company and watch the result update live
          through our Kubernetes-powered platform.
        </p>
      </div>

      {loading ? (
        <div className="loading">Loading candidates...</div>
      ) : (
        <div className="cards-container">
          {candidates.map((candidate) => (
            <div className="company-card" key={candidate._id}>
              <div className="logo-box">
                <img
                  src={companyLogos[candidate.name]}
                  alt={`${candidate.name} logo`}
                  className="company-logo"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>

              <h2>{candidate.name}</h2>
              <p className="vote-count">{candidate.votes} votes</p>

              <button
                className="vote-button"
                onClick={() => voteCandidate(candidate._id)}
              >
                Vote
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="winner-section">
        <button className="winner-button" onClick={showWinner}>
          Show Winner
        </button>

        {winner && <div className="winner-message">{winner}</div>}
      </div>
    </div>
  );
}

export default App;
