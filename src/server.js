let serverUrl;

if (process.env.NODE_ENV === "production") {
  serverUrl = "https://travaye-backend.onrender.com";
} else {
  serverUrl = "http://localhost:8080";
}

// Use serverUrl to make API calls in your code

export default serverUrl;
