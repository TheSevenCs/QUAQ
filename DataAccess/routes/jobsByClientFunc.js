const express = require("express");
const generalModule = require("../Database.js");
const router = express.Router();

// READ (QUERY)
router.get("/", async (req, res) => {
  // Code goes here
  const { company_id, client_id, jobStatus } = req.query;
});
// Matches company_id and client_id, has jobstatus: <ACTIVE>

module.exports = router;
