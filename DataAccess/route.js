const express = require("express"); // Imports the Express framework.
const path = require("path"); // Imports the File System module.
const fs = require("fs");
const { fileURLToPath } = require("url"); // Not used since ths href section is also unused?

const cors = require("cors");

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const directory = path.join(__dirname, "..");
app.use(express.static(path.join(__dirname, "..")));

app.use(express.json()); // Add this line to handle JSON data

// CLIENTS ROUTER
const clientsRouter = require("./routes/clients.js");
app.use("/clients", clientsRouter);

// STARTING THE SERVER
const PORT = 5500;
const HOST = "192.168.0.124"; // UPDATE THIS IP WITH ifconfig --> en0 --> inet 192.168.0.124
app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`);
});
