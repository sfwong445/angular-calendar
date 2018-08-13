const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')
const { sequelize } = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

require('./routes')(app)


sequelize.sync({force: false})
    .then(() => {
        app.listen(8081)
        console.log('Server started on port 8081')
    })