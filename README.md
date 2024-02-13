# Medication Intake Tracker

To start env you require installed docker on your local machine.

## Preferences

you need to create .env file in back folder

```env
APP_ID=back
PORT=8000
LOG_LEVEL=debug
REQUEST_LIMIT=100kb
SESSION_SECRET=somesecret
ORIGIN=http://localhost:3000
; POSTGRES_HOST=nozomi-postgres-1 - for docker enviroment
; POSTGRES_HOST=localhost - for local testing

OPENAPI_SPEC=/Y/spec
```

Use following command to build images and run containers from root:

```shell
docker-compose up -d
```

Use following command to run migrations:

```shell
./tool/migration.sh
```

application ready for use - open [frontend app](http://localhost:3000/)
