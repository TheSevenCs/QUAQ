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

// EQUIPMENT GROUPS ROUTER
const equipmentGroupsRouter = require("./routes/equipmentGroups.js");
app.use("/equipmentGroups", equipmentGroupsRouter);

// EQUIPMENT ROUTER
const equipmentRouter = require("./routes/equipment.js");
app.use("/equipment", equipmentRouter);

// TESTING ROUTERS
const personalScheduleFuncRouter = require("./routes/personalScheduleFunc.js");
app.use("/personalScheduleFunc", personalScheduleFuncRouter);

const jobsByClientFuncRouter = require("./routes/jobsByClientFunc.js");
app.use("/jobsByClientFunc", jobsByClientFuncRouter);

// STARTING THE SERVER
const PORT = 5500;
const HOST = "localhost"; // UPDATE THIS IP WITH ifconfig --> en0 --> inet 192.168.0.124
// const HOST = "127.0.0.1";
app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`);
});
