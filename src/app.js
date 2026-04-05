const express = require('express');

const app = express();

app.use(express.json())

const uploadRoutes = require('../src/routes/image.route');
app.use('/api/upload', uploadRoutes)

module.exports = app