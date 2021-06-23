module.exports = {
    postTrip(req, res, trips) {
        const {
            body: { name },
        } = req;

        trips.insertOne({ name }, (err, result) => {
            if (err) {
                // eslint-disable-next-line no-console
                console.error(err);
                res.status(500).json({ err });
                return;
            }
            res.status(200).json(result);
        });
    },
    postExpense(req, res, expenses) {
        expenses.insertOne(
            {
                trip: req.body.trip,
                date: req.body.date,
                amount: req.body.amount,
                category: req.body.category,
                description: req.body.description,
            },
            (err, result) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.error(err);
                    res.status(500).json({ err });
                    return;
                }
                res.status(200).json(result);
            },
        );
    },
};
