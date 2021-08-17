const express = require('express');
const db = require('./src/models');
const apiRoutes = require('./src/router/routes.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', apiRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listen on http://localhost:${PORT}`);
    })
}).catch(err => console.log(err));