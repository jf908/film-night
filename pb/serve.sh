#!/bin/sh

# build if needed
go mod tidy
go build

if [ ! -x "$(which modd)" ]; then
  echo "go install modd"
  go install github.com/cortesi/modd/cmd/modd@latest
fi

# load .env
if [ ! -f ../.env ]
then
  export $(cat ../.env | xargs)
fi

modd
