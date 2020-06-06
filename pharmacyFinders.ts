export interface Pharmacy {
    name: string;
    location: Location;
    address?: string;
    city?: string;
    zip?: number;
    state?: string;
}

export interface Location {
    latitude: number;
    longitude: number;
}

function getDistanceInMilesBetween(location1: Location, location2: Location): number {
    const lat1 = location1.latitude;
    const long1 = location1.longitude;
    const lat2 = location2.latitude;
    const long2 = location2.longitude;

    /*
    Full disclosure: this is a slightly modified version of the formula found here:
    https://www.geodatasource.com/developers/javascript

    I don't have the math background to be able to come up with this formula on my own.
    My unitests give me confidence that this formula meets my needs.
    */

    if (lat1 == lat2 && long1 == long2) {
        return 0;
    } else {
        const radLat1 = (Math.PI * lat1) / 180;
        const radLat2 = (Math.PI * lat2) / 180;
        const theta = long1 - long2;
        const radTheta = (Math.PI * theta) / 180;
        let distance =
            Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
        if (distance > 1) {
            distance = 1;
        }
        distance = Math.acos(distance);
        distance = (distance * 180) / Math.PI;
        distance = distance * 60 * 1.1515;
        return distance;
    }
}

export function findNearestPharmacy(pharmacies: Pharmacy[], location: Location) {
    const distancesToPharmaciesMap = new Map();
    pharmacies.forEach((pharmacy) => {
        distancesToPharmaciesMap.set(getDistanceInMilesBetween(pharmacy.location, location), pharmacy);
    });

    const shortestDistance = Math.min(...distancesToPharmaciesMap.keys());
    return {
        ...distancesToPharmaciesMap.get(shortestDistance),
        distance: shortestDistance,
    };
}
