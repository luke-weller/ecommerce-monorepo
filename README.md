# ecommerce-server

## Setup locally

1. Clone the reposatory to a local place on your computer.
2. Run `npm install` to install the packages.
3. Download and setup postgres.
4. Add a .ENV file to directory root, copy the code snippet below and update the variables with those from your development environment.

````DEV_PORT=8080
PG_USER=postgres-username
PG_HOST=postgres-hostname
PG_DATABASE=database-name
PG_PASSWORD=postgres-password
PG_PORT=postgress-port // eg. 5432
SECRET_KEY=your-secret-key // follow directions below```

To generate your secret key variable, run the script by executing `node scripts/generatesecretkey.js` from the root directory in your terminal and copy it into your .env file and update `SECRET_KEY=your-secret-key`
````
