const express = require('express');
const router = express.Router();

module.exports = (db_sndp_agil) => {
    // Route to get records from the sndp_agil.depot_du_cpl table by governorate
    router.get('/depot_du_cpl/search', (req, res) => {
        const { governorate } = req.query;
        const sql = 'SELECT * FROM sndp_agil.depot_du_cpl WHERE governorate = ?';

        db_sndp_agil.query(sql, [governorate], (err, result) => {
            if (err) {
                console.error('Error fetching data from sndp_agil.depot_du_cpl table:', err);
                res.status(500).json({ error: 'Error fetching data from sndp_agil.depot_du_cpl table' });
            } else {
                res.json(result);
            }
        });
    });

    // Route to get records from the sndp_agil.stations_services table by governorate
    router.get('/stations_services/search', (req, res) => {
        const { governorate } = req.query;
        const sql = 'SELECT * FROM sndp_agil.stations_services WHERE governorate = ?';

        db_sndp_agil.query(sql, [governorate], (err, result) => {
            if (err) {
                console.error('Error fetching data from sndp_agil.stations_services table:', err);
                res.status(500).json({ error: 'Error fetching data from sndp_agil.stations_services table' });
            } else {
                res.json(result);
            }
        });
    });

    // Route to get records from the sndp_agil.terminaux_depot_dhc table by governorate
    router.get('/terminaux_depot_dhc/search', (req, res) => {
        const { governorate } = req.query;
        const sql = 'SELECT * FROM sndp_agil.terminaux_depot_dhc WHERE governorate = ?';

        db_sndp_agil.query(sql, [governorate], (err, result) => {
            if (err) {
                console.error('Error fetching data from sndp_agil.terminaux_depot_dhc table:', err);
                res.status(500).json({ error: 'Error fetching data from sndp_agil.terminaux_depot_dhc table' });
            } else {
                res.json(result);
            }
        });
    });

    // Route to get all records from the sndp_agil.depot_du_cpl table
    router.get('/depot_du_cpl', (req, res) => {
        const sql = 'SELECT * FROM sndp_agil.depot_du_cpl';

        db_sndp_agil.query(sql, (err, result) => {
            if (err) {
                console.error('Error fetching data from sndp_agil.depot_du_cpl table:', err);
                res.status(500).json({ error: 'Error fetching data from sndp_agil.depot_du_cpl table' });
            } else {
                res.json(result);
            }
        });
    });

    // Route to get all records from the sndp_agil.stations_services table
    router.get('/stations_services', (req, res) => {
        const sql = 'SELECT * FROM sndp_agil.stations_services';

        db_sndp_agil.query(sql, (err, result) => {
            if (err) {
                console.error('Error fetching data from sndp_agil.stations_services table:', err);
                res.status(500).json({ error: 'Error fetching data from sndp_agil.stations_services table' });
            } else {
                res.json(result);
            }
        });
    });

    // Route to get all records from the sndp_agil.terminaux_depot_dhc table
    router.get('/terminaux_depot_dhc', (req, res) => {
        const sql = 'SELECT * FROM sndp_agil.terminaux_depot_dhc';

        db_sndp_agil.query(sql, (err, result) => {
            if (err) {
                console.error('Error fetching data from sndp_agil.terminaux_depot_dhc table:', err);
                res.status(500).json({ error: 'Error fetching data from sndp_agil.terminaux_depot_dhc table' });
            } else {
                res.json(result);
            }
        });
    });

    // Route to add a new record to the sndp_agil.depot_du_cpl table
    router.post('/depot_du_cpl', (req, res) => {
        const newRecord = req.body;
        const sql = 'INSERT INTO sndp_agil.depot_du_cpl SET ?';

        db_sndp_agil.query(sql, newRecord, (err, result) => {
            if (err) {
                console.error('Error adding new record to sndp_agil.depot_du_cpl table:', err);
                res.status(500).json({ error: 'Error adding new record to sndp_agil.depot_du_cpl table' });
            } else {
                res.json({ message: 'New record added to sndp_agil.depot_du_cpl successfully' });
            }
        });
    });

    // Route to add a new record to the sndp_agil.stations_services table
    router.post('/stations_services', (req, res) => {
        const newRecord = req.body;
        const sql = 'INSERT INTO sndp_agil.stations_services SET ?';

        db_sndp_agil.query(sql, newRecord, (err, result) => {
            if (err) {
                console.error('Error adding new record to sndp_agil.stations_services table:', err);
                res.status(500).json({ error: 'Error adding new record to sndp_agil.stations_services table' });
            } else {
                res.json({ message: 'New record added to sndp_agil.stations_services successfully' });
            }
        });
    });

    // Route to add a new record to the sndp_agil.terminaux_depot_dhc table
    router.post('/terminaux_depot_dhc', (req, res) => {
        const newRecord = req.body;
        const sql = 'INSERT INTO sndp_agil.terminaux_depot_dhc SET ?';

        db_sndp_agil.query(sql, newRecord, (err, result) => {
            if (err) {
                console.error('Error adding new record to sndp_agil.terminaux_depot_dhc table:', err);
                res.status(500).json({ error: 'Error adding new record to sndp_agil.terminaux_depot_dhc table' });
            } else {
                res.json({ message: 'New record added to sndp_agil.terminaux_depot_dhc successfully' });
            }
        });
    });

    // Route to update a record in the sndp_agil.depot_du_cpl table
    router.put('/depot_du_cpl/:station_id', (req, res) => {
        const stationId = req.params.station_id;
        const updatedRecordData = req.body;
        const sql = 'UPDATE sndp_agil.depot_du_cpl SET ? WHERE station_id = ?';

        db_sndp_agil.query(sql, [updatedRecordData, stationId], (err, result) => {
            if (err) {
                console.error('Error updating record in sndp_agil.depot_du_cpl table:', err);
                res.status(500).json({ error: 'Error updating record in sndp_agil.depot_du_cpl table' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Record not found' });
                } else {
                    res.json({ message: 'Record updated in sndp_agil.depot_du_cpl successfully' });
                }
            }
        });
    });

    // Route to update a record in the sndp_agil.stations_services table
    router.put('/stations_services/:station_id', (req, res) => {
        const stationId = req.params.station_id;
        const updatedRecordData = req.body;
        const sql = 'UPDATE sndp_agil.stations_services SET ? WHERE station_id = ?';

        db_sndp_agil.query(sql, [updatedRecordData, stationId], (err, result) => {
            if (err) {
                console.error('Error updating record in sndp_agil.stations_services table:', err);
                res.status(500).json({ error: 'Error updating record in sndp_agil.stations_services table' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Record not found' });
                } else {
                    res.json({ message: 'Record updated in sndp_agil.stations_services successfully' });
                }
            }
        });
    });

    // Route to update a record in the sndp_agil.terminaux_depot_dhc table
    router.put('/terminaux_depot_dhc/:station_id', (req, res) => {
        const stationId = req.params.station_id;
        const updatedRecordData = req.body;
        const sql = 'UPDATE sndp_agil.terminaux_depot_dhc SET ? WHERE station_id = ?';

        db_sndp_agil.query(sql, [updatedRecordData, stationId], (err, result) => {
            if (err) {
                console.error('Error updating record in sndp_agil.terminaux_depot_dhc table:', err);
                res.status(500).json({ error: 'Error updating record in sndp_agil.terminaux_depot_dhc table' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Record not found' });
                } else {
                    res.json({ message: 'Record updated in sndp_agil.terminaux_depot_dhc successfully' });
                }
            }
        });
    });

    // Route to delete a record from the sndp_agil.depot_du_cpl table
    router.delete('/depot_du_cpl/:station_id', (req, res) => {
        const stationId = req.params.station_id;
        const sql = 'DELETE FROM sndp_agil.depot_du_cpl WHERE station_id = ?';

        db_sndp_agil.query(sql, [stationId], (err, result) => {
            if (err) {
                console.error('Error deleting record from sndp_agil.depot_du_cpl table:', err);
                res.status(500).json({ error: 'Error deleting record from sndp_agil.depot_du_cpl table' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Record not found' });
                } else {
                    res.json({ message: 'Record deleted from sndp_agil.depot_du_cpl successfully' });
                }
            }
        });
    });

    // Route to delete a record from the sndp_agil.stations_services table
    router.delete('/stations_services/:station_id', (req, res) => {
        const stationId = req.params.station_id;
        const sql = 'DELETE FROM sndp_agil.stations_services WHERE station_id = ?';

        db_sndp_agil.query(sql, [stationId], (err, result) => {
            if (err) {
                console.error('Error deleting record from sndp_agil.stations_services table:', err);
                res.status(500).json({ error: 'Error deleting record from sndp_agil.stations_services table' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Record not found' });
                } else {
                    res.json({ message: 'Record deleted from sndp_agil.stations_services successfully' });
                }
            }
        });
    });

    // Route to delete a record from the sndp_agil.terminaux_depot_dhc table
    router.delete('/terminaux_depot_dhc/:station_id', (req, res) => {
        const stationId = req.params.station_id;
        const sql = 'DELETE FROM sndp_agil.terminaux_depot_dhc WHERE station_id = ?';

        db_sndp_agil.query(sql, [stationId], (err, result) => {
            if (err) {
                console.error('Error deleting record from sndp_agil.terminaux_depot_dhc table:', err);
                res.status(500).json({ error: 'Error deleting record from sndp_agil.terminaux_depot_dhc table' });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Record not found' });
                } else {
                    res.json({ message: 'Record deleted from sndp_agil.terminaux_depot_dhc successfully' });
                }
            }
        });
    });

    return router;
};

