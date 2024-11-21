const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// POST endpoint
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    // Process the input data
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercaseAlphabet = alphabets.filter(char => char === char.toLowerCase()).sort().slice(-1);
    const isPrimeFound = numbers.some(num => {
        const n = parseInt(num);
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return true;
        }
        return false;
    });

    // Dummy file handling logic
    const fileValid = file_b64 ? true : false; // Assuming file is valid if base64 string is provided
    const fileMimeType = fileValid ? 'image/png' : '';
    const fileSizeKb = fileValid ? 400 : 0;

    res.json({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        is_prime_found: isPrimeFound,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb
    });
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});