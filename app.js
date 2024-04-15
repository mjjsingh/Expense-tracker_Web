require("dotenv").config();

const express = require('express');
const app = express();  // Initialize Express app
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const sequelize = require('./util/db');
const morgan = require("morgan");
// const helmet = require('helmet');

const verify = require('./middleware/verifyTokenHandler');

const userRoute = require('./routes/userRoute');
const expanseRouter = require('./routes/expanseRoute');
const redirectingRoute = require('./routes/redirectingRoute');

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname,"public")));
// app.use(morgan("combined", { stream: accessLogStream }));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

