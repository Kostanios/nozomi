# Medication Intake Tracker Backend

## Preferences

require Node js 18.19.0

you need to create .env file in back folder

```env
APP_ID=back
PORT=8000
LOG_LEVEL=debug
REQUEST_LIMIT=100kb
SESSION_SECRET=somesecret
ORIGIN=http://localhost:3000
POSTGRES_HOST=localhost

OPENAPI_SPEC=/Y/spec

```
Note: set POSTGRES_HOST equal 'nozomi-postgres-1' - for docker enviroment

## Quick Start

Get started developing with develop mode...

```shell
# install deps
npm ci

# run in development mode
npm run dev
```

---

#### Run in *production* mode:

Compiles the application and starts it in production mode.

```shell
npm ci
npm run compile
npm start
```

