## Start Express Server
npx ts-node ./src/app.ts

## Start Local Database
docker-compose up -d or docker-compose --env-file .env up

## Run tests
npm test

## Reset Database
npx prisma migrate reset

## Run migrations
npx prisma migrate dev
