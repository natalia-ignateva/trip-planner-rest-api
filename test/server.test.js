const { MongoClient } = require('mongodb');

/*global describe, it, beforeAll, afterAll, expect*/
/*eslint no-undef: "error"*/

describe('insert', () => {
    let connection;
    let db;

    it('Should insert a doc into collection', async () => {
        const trips = db.collection('trips');
        const mockTrip = { _id: '1', name: 'Tour in Bristol' };
        await trips.insertOne(mockTrip);
        const insertedTrip = await trips.findOne({ _id: '1' });
        expect(insertedTrip).toEqual(mockTrip);
    });

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db();
    });

    afterAll(async () => {
        await connection.close();
    });
});
