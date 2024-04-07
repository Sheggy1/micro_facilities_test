const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  user: '', //add ur personal
  host: '', //add ur personal
  database: '', //add ur personal
  password: '', //add ur personal
  port: , //add ur personal
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); 
    }
    next();
});

app.post('/createFacility', async (req, res) => {
    const { facilityCode, equipmentTypeCode, equipmentCount } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO facility (code, description, equip_area) VALUES ($1, $2, $3)',
        [facilityCode, equipmentTypeCode, equipmentCount]
      );
      client.release();
      res.send('Facility created successfully');
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error creating facility');
    }
});

app.post('/createTech', async (req, res) => {
    const { techCode, techCodeType, quantityTech } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO typetech (code, description, area) VALUES ($1, $2, $3)',
        [techCode, techCodeType, quantityTech]
      );
      client.release();
      res.send('Tech created successfully');
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).send('Error creating tech');
    }
});

app.post('/createContract', async (req, res) => {
    const { contractNumber, contractFacilityCode, contractEquipmentTypeCode, contractEquipmentCount } = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO contract (number, production, equip_type, quantity) VALUES ($1, $2, $3, $4)',
            [contractNumber, contractFacilityCode, contractEquipmentTypeCode, contractEquipmentCount]
        );
        client.release();
        res.send('Contract created successfully');
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error creating contract');
    }
});

app.get('/getContracts', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM contract');
        client.release();
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error retrieving contracts');
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});