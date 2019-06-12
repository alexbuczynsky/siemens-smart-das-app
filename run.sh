#!/bin/sh

cd server

dotnet restore

dotnet publish -r osx.10.11-x64 --output bin/dist/osx
dotnet publish -r linux-x64 --output bin/dist/linux

cd ../client

npm run start:electron