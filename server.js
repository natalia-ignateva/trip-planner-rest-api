const express = require('express')
const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const app = express()
app.use(express.json())

let db, trips, expenses

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    db = client.db('tripcosts')
    trips = db.collection('trips')
    expenses = db.collection('expenses')
  }
)

// POST a trip
app.post('/trip', (req, res) => {
    const name = req.body.name
    console.log(trips)
    trips.insertOne({ name: name }, (err, result) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        console.log(result)
        res.status(200).json({ ok: true })
    })
})

// GET a list of trips
app.get('/trips', (req, res) => {})

// POST expencse of a trip
app.post('/expense', (req, res) => {})

// GET all expenses
app.get('/expenses', (req, res) => {})

app.listen(3000, () => console.log('Server is ready'))