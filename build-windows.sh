#!/bin/sh

cd server

dotnet restore

rm -r bin/dist
dotnet build
dotnet publish -r win10-x64 --output bin/dist/win

cd ../client

yarn

yarn run build

yarn run build:electron:windows
