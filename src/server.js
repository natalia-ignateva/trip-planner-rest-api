const express = require('express');
const mongo = require('mongodb').MongoClient;
const { getExpenses, getTrips } = require('./api/get');
const { postExpense, postTrip } = require('./api/post');

const app = express();
app.use(express.json());

const URL = 'mongodb://localhost:27017';

let expenses;
let trips;

mongo.connect(
    URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            return;
        }
        const db = client.db('tripcosts');
        trips = db.collection('trips');
        expenses = db.collection('expenses');
    },
);

// POST a trip
app.post('/trip', (req, res) => postTrip(req, res, trips));

// GET a list of trips
app.get('/trips', (req, res) => getTrips(res, trips));

// POST expense of a trip (trip, date, amount, category, description)
app.post('/expense', (req, res) => postExpense(req, res, expenses));

// GET all expenses
app.get('/expenses', (req, res) => getExpenses(req, res, expenses));

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Server is ready'));
