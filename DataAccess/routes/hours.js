const express = require("express");
const generalModule = require("../Database.js");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {});
// READ
router.get("/", async (req, res) => {});
// UPDATE
router.patch("/", async (req, res) => {
  try {
    // GET PARAMS FROM REQ
    const { requestStatus, requestTime } = req.query; // REMEMBER TO SAVE LOCALLY
  } catch (error) {
    // ERROR MESSAGE
  }
});
// DELETE
router.delete("/", async (req, res) => {});

module.exports = router;
