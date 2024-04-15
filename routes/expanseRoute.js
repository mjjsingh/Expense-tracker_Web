const express = require("express");
const router = express.Router();

const {
  createExpanse,
  fetchExpanse,
  
} = require("../controllers/ExpanseController");

router.post("/", createExpanse);
router.get("/paginated", fetchExpanse);


module.exports = router;