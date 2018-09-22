const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { sequelize } = require('./models');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(morgan('combined'));

require('./routes')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

const port = process.env.PORT || 8081;

sequelize.sync({ force: false }).then(() => {
    app.listen(port);
    console.log(`Server started on Port ${port}`);
});
