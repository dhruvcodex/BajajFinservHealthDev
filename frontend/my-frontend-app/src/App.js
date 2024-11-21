import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [inputData, setInputData] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state
        setResponse(null); // Reset response state

        try {
            // Validate JSON input
            const jsonData = JSON.parse(inputData);
            if (!jsonData.data || !Array.isArray(jsonData.data)) {
                throw new Error("Invalid input: 'data' should be an array.");
            }

            // Send POST request to the backend
            const res = await axios.post('https://localhost/3000/bfhl', jsonData);
            setResponse(res.data); // Set the response data
        } catch (error) {
            console.error("Error:", error);
            setError(error.message || "An error occurred while processing your request.");
        }
    };

    const handleSelectChange = (event) => {
        const options = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    const renderResponse = () => {
        if (!response) return null;

        const filteredResponse = {};
        if (selectedOptions.includes('Alphabets')) {
            filteredResponse.alphabets = response.alphabets;
        }
        if (selectedOptions.includes('Numbers')) {
            filteredResponse.numbers = response.numbers;
        }
        if (selectedOptions.includes('Highest lowercase alphabet')) {
            filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        }

        return (
            <div>
                <h2>Response:</h2>
                <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
            </div>
        );
    };

    return (
        <div className="App">
            <h1>0827CS211075</h1> 
            <form onSubmit={handleSubmit}>
                <textarea
                    rows="5"
                    cols="40"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder='Enter JSON data here...'
                    required
                />
                <br />
                <button type="submit">Submit</button>
            </form>
            {error && (
                <div style={{ color: 'red' }}>
                    <h2>Error:</h2>
                    <p>{error}</p>
                </div>
            )}
            {response && (
                <div>
                    <h2>Select Response Options:</h2>
                    <select multiple onChange={handleSelectChange}>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>
                    {renderResponse()}
                </div>
            )}
        </div>
    );
};

export default App;