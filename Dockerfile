FROM golang:1.20-alpine AS builder
WORKDIR /build
COPY pb/go.mod pb/go.sum pb/main.go ./
COPY pb/hooks ./hooks
RUN apk --no-cache add upx make git gcc libtool musl-dev ca-certificates dumb-init \
  && go mod tidy \
  && CGO_ENABLED=0 go build \
  && upx pocketbase

FROM node:18-alpine AS builder2
WORKDIR /build2
COPY sk ./
RUN npx pnpm install && npm run build

FROM alpine
WORKDIR /app/pb
COPY --from=builder /build/pocketbase /app/pb/pocketbase
COPY pb/pb_migrations ./pb_migrations
COPY --from=builder2 /build2/build /app/pb/pb_public
CMD ["/app/pb/pocketbase","serve", "--http", "0.0.0.0:8090"]