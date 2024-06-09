const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse JSON data from requests
app.use(bodyParser.json());

// Route to handle POST requests for saving contributed data
app.post('/contribute', (req, res) => {
    const { companyName, countrySupport } = req.body;

    // Read existing data from JSON file (if file exists)
    let data = [];
    try {
        const jsonData = fs.readFileSync('data.json', 'utf8');
        data = JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading file:', error);
    }

    // Add new contribution to data array
    data.push({ companyName, countrySupport });

    // Write updated data back to JSON file
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).send('Failed to save data');
        } else {
            console.log('Data saved successfully');
            res.status(200).send('Data saved successfully');
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
