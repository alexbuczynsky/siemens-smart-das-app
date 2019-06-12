#!/bin/sh

cd server

dotnet restore

rm -r bin/dist
dotnet build
dotnet publish -r win10-x64 --output bin/dist/win

cd ../client

npm install

npm run build

npm run build:electron:windows
