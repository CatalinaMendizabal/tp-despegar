#!/usr/bin/env sh

set -x
npx prisma migrate reset
set +x

set -x
npx prisma migrate dev
set +x

set -x
npm test
set +x