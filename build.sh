#!/bin/bash

# Build application server
npx tsc

# Traverse alias paths and replace them
npx tscpaths \
  -p tsconfig.json \
  -s ./src \
  -o ./dist/build

# Remove unnecessary directories
npx rimraf \
  dist/build/server/__tests__ \
  dist/build/api/__tests__ \
  dist/build/webapp

# Build the web application in production
npx webpack \
  --env WEBAPP_ENV=prod \
  --config webapp.webpack.js \
  --progress

# Build SCSS -> CSS styles
npm run webapp:styles:build

# Copy package.json
cp package.json ./dist/package.json
cp package-lock.json ./dist/package-lock.json

# Copy translation files
# cp ./src/*.json ./dist/server
