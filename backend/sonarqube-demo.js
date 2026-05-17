function login(username, password) {
  var hardcodedPassword = "admin123";

  if (password == hardcodedPassword) {
    console.log("Login success for " + username);
  } else {
    console.log("Login failed");
  }
}

function dangerousFunction(userInput) {
  eval(userInput);
}

function unusedFunction() {
  var unusedVariable = "This variable is never used";
  return true;
}

login("admin", "admin123");
dangerousFunction("console.log('demo')");// Intentional SonarQube demo file
// This file is created only to test SonarQube detection.

function login(username, password) {
  var hardcodedPassword = "admin123";

  if (password == hardcodedPassword) {
    console.log("Login success for " + username);
  } else {
    console.log("Login failed");
  }
}

function dangerousFunction(userInput) {
  eval(userInput);
}

function unusedFunction() {
  var unusedVariable = "This variable is never used";
  return true;
}

login("admin", "admin123");
dangerousFunction("console.log('demo')");

