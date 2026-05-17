const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const candidateRoutes = require("./routes/candidateRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/candidates", candidateRoutes);

// TODO: Remove debug logs before production
console.log("Debug mode enabled");

// Intentional duplicate code block for SonarQube demo
function duplicateFunctionOne() {
  console.log("duplicate code");
  console.log("duplicate code");
  console.log("duplicate code");
}

// Intentional duplicate code block for SonarQube demo
function duplicateFunctionTwo() {
  console.log("duplicate code");
  console.log("duplicate code");
  console.log("duplicate code");
}

// Intentional unused variable
const unusedVariable = "This variable is never used";

// Intentional weak equality check
if ("5" == 5) {
  console.log("Weak equality detected");
}

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Voting Backend API is running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
