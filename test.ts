import {findNearestPharmacy, Pharmacy} from './pharmacyFinders';

describe('findNearestPharmacy', () => {
    let pharmacies: Pharmacy[];

    beforeEach(() => {
        pharmacies = [
            {
                name: 'CVS in Kansas City',
                location: {
                    latitude: 39.0525466,
                    longitude: -94.5953187,
                },
            },
            {
                name: 'CVS on Nall',
                location: {
                    latitude: 38.9560551,
                    longitude: -94.6507578,
                },
            },
            {
                name: 'Another CVS in Kansas City',
                location: {
                    latitude: 39.0525465,
                    longitude: -94.5953187,
                },
            },
        ];
    });

    it('is defined', () => {
        expect(findNearestPharmacy).toBeDefined();
    });

    it('finds nearest pharmacy out of an array of pharmacies', () => {
        const latitude = 38.9280533;
        const longitude = -94.6993287;
        expect(findNearestPharmacy(pharmacies, {latitude, longitude}).name).toBe('CVS on Nall');
    });

    it('includes distance to pharmacy in result', () => {
        const latitude = 38.9280533;
        const longitude = -94.6993287;
        expect(findNearestPharmacy(pharmacies, {latitude, longitude}).distance).toBeCloseTo(3.24, 1);
    });

    it('finds the right pharmacy if input location and pharmacy location are identical', () => {
        const latitude = 39.0525465;
        const longitude = -94.5953187;
        expect(findNearestPharmacy(pharmacies, {latitude, longitude}).name).toBe('Another CVS in Kansas City');
    });

    it('finds "more recent" pharmacy if two pharmacies are equal distance from input location', () => {
        const latitude = 39.0525465;
        const longitude = -94.5953187;
        pharmacies.push({
            name: 'Walgreens by the CVS',
            location: {
                latitude: 39.0525465,
                longitude: -94.5953187,
            },
        });
        expect(findNearestPharmacy(pharmacies, {latitude, longitude}).name).toBe('Walgreens by the CVS');
    });
});
