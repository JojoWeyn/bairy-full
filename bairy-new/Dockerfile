# Stage 1: Build
FROM node:20 AS builder

WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build

# Stage 2: Just output build (can be skipped if you use volumes)
FROM scratch AS export-stage
COPY --from=builder /app/dist /dist