const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Base URL of your Spring Boot backend
const BASE_URL = 'http://localhost:8080/api';

// Fetch security questions
app.get('/security-questions', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/security-questions`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching security questions');
    }
});

// Initiate password reset
app.post('/password/initiate', async (req, res) => {
    try {
        const response = await axios.post(`${BASE_URL}/password/initiate`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

// Verify security answers
app.post('/password/verify-answers', async (req, res) => {
    try {
        const response = await axios.post(`${BASE_URL}/password/verify-answers`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

// Reset password
app.post('/password/reset', async (req, res) => {
    try {
        const response = await axios.post(`${BASE_URL}/password/reset`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

app.listen(3000, () => {
    console.log('Middleware server running on port 3000');
});
