# Film Night

A website made to help a group of people decide what movie to watch for movie night.

![Screenshot](https://user-images.githubusercontent.com/2487520/271775029-f876d1bf-1c4f-4398-a864-387d04f8bc4d.png)

> Uses the TMDB API

## Setup for production

Using docker and this command should be all you need to set it up.

```sh
docker compose up -d
```

Reverse proxying with https is not included but recommended.

## Dev

Requirements

- [go](https://go.dev/doc/install)
- [Node.js](https://nodejs.org/en)
- [pnpm](https://pnpm.io/installation)

To serve the backend in dev mode, use

```sh
cd pb
./serve.sh # or serve.bat on Windows
```

To serve the frontend in dev mode, use

```sh
cd sk
pnpm dev
```

but remember to install frontend deps first

```sh
cd sk
pnpm install
```
