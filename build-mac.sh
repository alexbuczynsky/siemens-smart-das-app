#!/bin/sh

cd server

dotnet restore

dotnet publish -r osx.10.11-x64 --output bin/dist/osx

cd ../client

npm install

npm run build:electron:mac