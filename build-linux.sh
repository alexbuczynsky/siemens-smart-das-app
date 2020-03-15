#!/bin/sh

cd server

dotnet restore

dotnet publish -r linux-x64 --output bin/dist/linux

cd ../client

yarn

yarn build:electron:linux