// ====================================
// Server Entry Point – index.js
// ====================================
//
// Purpose:
// This is the main entry point of the Node.js server.
// It loads the Express application from app.js and starts listening on the defined port.
//
// Behavior:
// - Loads the Express app instance
// - Retrieves the port number from environment variables (default: 3000)
// - Starts the server on 0.0.0.0 (accessible from all interfaces)
// - Logs a message when the server is successfully running

const app = require("./app"); // Load the configured Express app instance

const PORT = process.env.PORT || 4000; // Use port from environment or default to 3000

// Start the server and listen on all network interfaces
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
});
