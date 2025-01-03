require('dotenv').config();
const express = require('express');
const cors= require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/authRoutes');
const calorieRoutes = require('./routes/calorieRoutes');
const gymLoactionRoutes = require('./routes/gymLocationRoutes');
const personalTrainerRoutes = require('./routes/personalTrainerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT =  666;
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
)

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/calories', calorieRoutes);
app.use('/gymlocations', gymLoactionRoutes);
app.use('/personaltrainers', personalTrainerRoutes);
app.use('/booking', bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
