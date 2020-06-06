import express, {Request} from 'express';
import {Location, findNearestPharmacy, Pharmacy} from './pharmacyFinders';
import {pharmacies} from './fakeDatabase';

const app = express();
const port = 3000;

function getAllPharmacies() {
    return pharmacies;
}

app.get('/pharmacies', (req, res) => {
    const allPharmacies: Pharmacy[] = getAllPharmacies();
    if (!req.query.lat && !req.query.long) {
        return res.send(allPharmacies);
    }

    const requesterLocation = {
        latitude: Number(req.query.lat),
        longitude: Number(req.query.long),
    } as Location;
    return res.send(findNearestPharmacy(allPharmacies, requesterLocation));
});

app.listen(port, () => {
    console.log(`Pharmacy distance calculator is listening at http://localhost:${port}`);
});
