import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const companyMeta = {
  Google: { logo: "https://cdn.simpleicons.org/google", color: "#4285F4" },
  Amazon: { logo: "https://cdn.simpleicons.org/amazon", color: "#FF9900" },
  Microsoft: { logo: "https://cdn.simpleicons.org/microsoft", color: "#00A4EF" },
  NVIDIA: { logo: "https://cdn.simpleicons.org/nvidia", color: "#76B900" },
  Meta: { logo: "https://cdn.simpleicons.org/meta", color: "#0866FF" },
  Apple: { logo: "https://cdn.simpleicons.org/apple", color: "#1D1D1F" },
  Netflix: { logo: "https://cdn.simpleicons.org/netflix", color: "#E50914" },
  Tesla: { logo: "https://cdn.simpleicons.org/tesla", color: "#CC0000" },
  Salesforce: { logo: "https://cdn.simpleicons.org/salesforce", color: "#00A1E0" },
  Adobe: { logo: "https://cdn.simpleicons.org/adobe", color: "#FF0000" },
};

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
      setWinner(`It's a tie between ${winners.map((winner) => winner.name).join(", ")}!`);
    } else {
      setWinner(`Congratulations ${winners[0].name} has won!`);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="app">
      <section className="hero">
        <div className="badge">Live Kubernetes Deployment</div>
        <h1>Tech Giants Voting Platform</h1>
        <p>
          Vote for your favorite company and watch updates flow through Jenkins,
          DockerHub, Kubernetes, Prometheus, and Grafana.
        </p>
      </section>

      <section className="card-container">
        {candidates.map((candidate) => {
          const meta = companyMeta[candidate.name] || {
            logo: "https://cdn.simpleicons.org/react",
            color: "#64748B",
          };

          return (
            <div className="card" key={candidate._id} style={{ "--accent": meta.color }}>
              <div className="logo-wrap">
                <img src={meta.logo} alt={`${candidate.name} logo`} />
              </div>

              <h2>{candidate.name}</h2>
              <p className="votes">Votes: {candidate.votes}</p>

              <button onClick={() => voteCandidate(candidate._id)}>
                Vote
              </button>
            </div>
          );
        })}
      </section>

      <section className="result-section">
        <button className="winner-button" onClick={showWinner}>
          🏆 Show Final Result
        </button>

        {winner && <h2 className="winner-message">{winner}</h2>}
      </section>
    </div>
  );
}

export default App;
