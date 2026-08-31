const path = require("path");

const backendDir = path.resolve(__dirname, "backend");
const logsDir = path.resolve(__dirname, "logs");

module.exports = {
  apps: [
    {
      name: "wedding-api",
      cwd: backendDir,
      script: "server.js",
      interpreter: "node",
      exec_mode: "fork",
      instances: 1,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 5000
      },
      error_file: path.join(logsDir, "wedding-api-error.log"),
      out_file: path.join(logsDir, "wedding-api-out.log"),
      merge_logs: true,
      time: true,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000
    }
  ]
};