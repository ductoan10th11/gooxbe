const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/user.route');
const kpiRoute = require('./routes/kpi.route');

const app = express();

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoute);
app.use('/api/kpi', kpiRoute);

app.get('/', (req, res) => {
    res.send('GooX API is running...');
});

module.exports = app;
