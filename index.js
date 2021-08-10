const express = require('express');
const db = require('./models');
const apiRoutes = require('./router/routes.js');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/v1', apiRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listen on http://localhost:${PORT}`);
    })
}).catch(err => console.log(err));