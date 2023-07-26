const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MySQL total_energy database connection
const db_total_energy = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '22890024',
    database: 'total_energy',
});
// Connect to MySQL total energy
db_total_energy.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL total_energy database:', err);
    } else {
        console.log('Connected to MySQL total_energy database.');
    }
});

// MySQL ola_energy database connection
const db_ola_energy = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '22890024',
    database: 'ola_energy',
});
// Connect to MySQL ola_energy
db_ola_energy.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL ola_energy database:', err);
    } else {
        console.log('Connected to MySQL ola_energy database.');
    }
});

// MySQL sndp_agil database connection
const db_sndp_agil = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '22890024',
    database: 'sndp_agil',
});
// Connect to MySQL sndp_agil
db_sndp_agil.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL sndp_agil database:', err);
    } else {
        console.log('Connected to MySQL sndp_agil database.');
    }
});

// MySQL shell database connection
const db_shell = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '22890024',
    database: 'shell',
});
// Connect to MySQL shell
db_shell.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL shell database:', err);
    } else {
        console.log('Connected to MySQL shell database.');
    }
});

// Import the routes from routes folder
const totalEnergyRoutes = require('./routes/routes_total_energy')(db_total_energy);
const olaEnergyRoutes = require('./routes/routes_ola_energy')(db_ola_energy);
const sndpAgilRoutes = require('./routes/routes_sndp_agil')(db_sndp_agil);
const shellRoutes = require('./routes/routes_shell')(db_shell);

// Use the routes in your Express app
app.use('/total_energy', totalEnergyRoutes);
app.use('/ola_energy', olaEnergyRoutes);
app.use('/sndp_agil', sndpAgilRoutes);
app.use('/shell', shellRoutes);



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
