# Instructions

First, after cloning this repo, run `npx yarn` to install dependencies (note that I use `yarn` commands and `npx` in all my instructions, but the application should run equally well without using `npx` and using `npm` instead of `yarn`). Then...

## To run the unittest suite:

`npx yarn test`

## To run the API server:

`npx yarn start`

Once the server is running, you can make requests to the the http://localhost:3000/pharmacies endpoint, supplying latitude and longitude as `lat` and `long` in the query string. For example:

http://localhost:3000/pharmacies?lat=38.9577925&long=-94.657138

This will return the pharmacy nearest to the specified coordinates. If no latitude and longitude are specified, all pharmacies are returned.
