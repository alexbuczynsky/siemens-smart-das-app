#!/bin/sh

cd server

dotnet restore

dotnet publish -r osx.10.11-x64 --output bin/dist/osx
dotnet publish -r linux-x64 --output bin/dist/linux
dotnet publish -r win10-x64 --output bin/dist/win

cd ../client

npm install

npm run build:electron:mac