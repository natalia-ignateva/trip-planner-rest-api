module.exports = {
    getTrips(req, res, trips) {
        trips.find().toArray((err, items) => {
            if (err) {
                // eslint-disable-next-line no-console
                console.error(err);
                res.status(500).json({ err });
                return;
            }
            res.status(200).json({ trips: items });
        });
    },
    getExpenses(req, res, expenses) {
        expenses.find({ trip: req.body.trip }).toArray((err, items) => {
            if (err) {
                // eslint-disable-next-line no-console
                console.error(err);
                return res.status(500).json({ err });
            }
            return res.status(200).json({ expenses: items });
        });
    },
};
