const express = require('express');
const router = express.Router();

module.exports = (db_shell) => {
    // Route to get records from the shell.depot_du_cpl table by governorate
    router.get('/depot_du_cpl/search', (req, res) => {
        const { governorate } = req.query;
        const sql = 'SELECT * FROM shell.depot_du_cpl WHERE governorate = ?';

        db_shell.query(sql, [governorate], (err, result) => {
            if (err) {
                console.error('Error fetching data from shell.depot_du_cpl table:', err);
                res.status(500).json({ error: 'Error fetching data from shell.depot_du_cpl table' });
            } else {
                res.json(result);
            }
        });
    });

    // Route to get all records from the shell.depot_du_cpl table
    router.get('/depot_du_cpl', (req, res) => {
        const sql = 'SELECT * FROM shell.depot_du_cpl';

        db_shell.query(sql, (err, result) => {
            if (err) {
                console.error('Error fetching data from shell.depot_du_cpl table:', err);
                res.status(500).json({ error: 'Error fetching data from shell.depot_du_cpl table' });
            } else {
                res.json(result);
            }
        });
    });

    // Route to add a new record to the shell.depot_du_cpl table
    router.post('/depot_du_cpl', (req, res) => {
        const newRecord = req.body;
        const sql = 'INSERT INTO shell.depot_du_cpl SET ?';

        db_shell.query(sql, newRecord, (err, result) => {
            if (err) {
                console.error('Error adding new record to shell.depot_du_cpl table:', err);
                res.status(500).json({ error: 'Error adding new record to shell.depot_du_cpl table' });
            } else {
                res.json({ message: 'New record added to shell.depot_du_cpl successfully' });
            }
        });
    });

    // Route to update a record in the shell.depot_du_cpl table
    router.put('/depot_du_cpl/:station_id', (req, res) => {
        const stationId = req.params.station_id;
        const updatedRecordData = req.body;
        const sql = 'UPDATE shell.depot_du_cpl SET ? WHERE station_id = ?';

        db_shell.query(sql, [updatedRecordData, stationId], (err, result) => {
            if (err) {
                console.error('Error updating record in shell.depot_du_cpl table:', err);
                res.status(500).json({ error: 'Error updating record in shell.depot_du_cpl table' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Record not found' });
                } else {
                    res.json({ message: 'Record updated in shell.depot_du_cpl successfully' });
                }
            }
        });
    });

    // Route to delete a record from the shell.depot_du_cpl table
    router.delete('/depot_du_cpl/:station_id', (req, res) => {
        const stationId = req.params.station_id;
        const sql = 'DELETE FROM shell.depot_du_cpl WHERE station_id = ?';

        db_shell.query(sql, [stationId], (err, result) => {
            if (err) {
                console.error('Error deleting record from shell.depot_du_cpl table:', err);
                res.status(500).json({ error: 'Error deleting record from shell.depot_du_cpl table' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Record not found' });
                } else {
                    res.json({ message: 'Record deleted from shell.depot_du_cpl successfully' });
                }
            }
        });
    });

    // Route to get records from the shell.stations_services table by governorate
    router.get('/stations_services/search', (req, res) => {
        const { governorate } = req.query;
        const sql = 'SELECT * FROM shell.stations_services WHERE governorate = ?';

        db_shell.query(sql, [governorate], (err, result) => {
            if (err) {
                console.error('Error fetching data from shell.stations_services table:', err);
                res.status(500).json({ error: 'Error fetching data from shell.stations_services table' });
            } else {
                res.json(result);
            }
        });
    });

    // Route to get all records from the shell.stations_services table
    router.get('/stations_services', (req, res) => {
        const sql = 'SELECT * FROM shell.stations_services';

        db_shell.query(sql, (err, result) => {
            if (err) {
                console.error('Error fetching data from shell.stations_services table:', err);
                res.status(500).json({ error: 'Error fetching data from shell.stations_services table' });
            } else {
                res.json(result);
            }
        });
    });

    // Route to add a new record to the shell.stations_services table
    router.post('/stations_services', (req, res) => {
        const newRecord = req.body;
        const sql = 'INSERT INTO shell.stations_services SET ?';

        db_shell.query(sql, newRecord, (err, result) => {
            if (err) {
                console.error('Error adding new record to shell.stations_services table:', err);
                res.status(500).json({ error: 'Error adding new record to shell.stations_services table' });
            } else {
                res.json({ message: 'New record added to shell.stations_services successfully' });
            }
        });
    });

    // Route to update a record in the shell.stations_services table
    router.put('/stations_services/:station_id', (req, res) => {
        const stationId = req.params.station_id;
        const updatedRecordData = req.body;
        const sql = 'UPDATE shell.stations_services SET ? WHERE station_id = ?';

        db_shell.query(sql, [updatedRecordData, stationId], (err, result) => {
            if (err) {
                console.error('Error updating record in shell.stations_services table:', err);
                res.status(500).json({ error: 'Error updating record in shell.stations_services table' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Record not found' });
                } else {
                    res.json({ message: 'Record updated in shell.stations_services successfully' });
                }
            }
        });
    });

    // Route to delete a record from the shell.stations_services table
    router.delete('/stations_services/:station_id', (req, res) => {
        const stationId = req.params.station_id;
        const sql = 'DELETE FROM shell.stations_services WHERE station_id = ?';

        db_shell.query(sql, [stationId], (err, result) => {
            if (err) {
                console.error('Error deleting record from shell.stations_services table:', err);
                res.status(500).json({ error: 'Error deleting record from shell.stations_services table' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Record not found' });
                } else {
                    res.json({ message: 'Record deleted from shell.stations_services successfully' });
                }
            }
        });
    });

    // Route to get records from the shell.terminaux_depot_dhc table by governorate
    router.get('/terminaux_depot_dhc/search', (req, res) => {
        const { governorate } = req.query;
        const sql = 'SELECT * FROM shell.terminaux_depot_dhc WHERE governorate = ?';

        db_shell.query(sql, [governorate], (err, result) => {
            if (err) {
                console.error('Error fetching data from shell.terminaux_depot_dhc table:', err);
                res.status(500).json({ error: 'Error fetching data from shell.terminaux_depot_dhc table' });
            } else {
                res.json(result);
            }
        });
    });

    // Route to get all records from the shell.terminaux_depot_dhc table
    router.get('/terminaux_depot_dhc', (req, res) => {
        const sql = 'SELECT * FROM shell.terminaux_depot_dhc';

        db_shell.query(sql, (err, result) => {
            if (err) {
                console.error('Error fetching data from shell.terminaux_depot_dhc table:', err);
                res.status(500).json({ error: 'Error fetching data from shell.terminaux_depot_dhc table' });
            } else {
                res.json(result);
            }
        });
    });

    // Route to add a new record to the shell.terminaux_depot_dhc table
    router.post('/terminaux_depot_dhc', (req, res) => {
        const newRecord = req.body;
        const sql = 'INSERT INTO shell.terminaux_depot_dhc SET ?';

        db_shell.query(sql, newRecord, (err, result) => {
            if (err) {
                console.error('Error adding new record to shell.terminaux_depot_dhc table:', err);
                res.status(500).json({ error: 'Error adding new record to shell.terminaux_depot_dhc table' });
            } else {
                res.json({ message: 'New record added to shell.terminaux_depot_dhc successfully' });
            }
        });
    });

    // Route to update a record in the shell.terminaux_depot_dhc table
    router.put('/terminaux_depot_dhc/:station_id', (req, res) => {
        const stationId = req.params.station_id;
        const updatedRecordData = req.body;
        const sql = 'UPDATE shell.terminaux_depot_dhc SET ? WHERE station_id = ?';

        db_shell.query(sql, [updatedRecordData, stationId], (err, result) => {
            if (err) {
                console.error('Error updating record in shell.terminaux_depot_dhc table:', err);
                res.status(500).json({ error: 'Error updating record in shell.terminaux_depot_dhc table' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Record not found' });
                } else {
                    res.json({ message: 'Record updated in shell.terminaux_depot_dhc successfully' });
                }
            }
        });
    });

    // Route to delete a record from the shell.terminaux_depot_dhc table
    router.delete('/terminaux_depot_dhc/:station_id', (req, res) => {
        const stationId = req.params.station_id;
        const sql = 'DELETE FROM shell.terminaux_depot_dhc WHERE station_id = ?';

        db_shell.query(sql, [stationId], (err, result) => {
            if (err) {
                console.error('Error deleting record from shell.terminaux_depot_dhc table:', err);
                res.status(500).json({ error: 'Error deleting record from shell.terminaux_depot_dhc table' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Record not found' });
                } else {
                    res.json({ message: 'Record deleted from shell.terminaux_depot_dhc successfully' });
                }
            }
        });
    });

    return router;
};
