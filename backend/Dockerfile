# Stage 1: Build
FROM golang:1.24 AS builder

WORKDIR /app

# Устанавливаем инструменты и SQLite dev-библиотеки
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
    libsqlite3-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Сборка с включённым CGO
RUN CGO_ENABLED=1 GOOS=linux go build -ldflags="-s -w" -o main ./cmd/app

# Stage 2: Runtime (glibc-based)
FROM debian:bookworm-slim

# Устанавливаем только runtime-библиотеки SQLite (не dev)
RUN apt-get update && apt-get install -y --no-install-recommends \
    sqlite3 \
    libsqlite3-0 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/main ./main
COPY --from=builder /app/data.db ./data.db

EXPOSE 8080

CMD ["./main"]