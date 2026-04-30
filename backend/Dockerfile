# ──────────────────────────────────────────────────────────────────────────────
# EduReach API – Multi-stage Dockerfile (NestJS)
# ──────────────────────────────────────────────────────────────────────────────

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
RUN apk add --no-cache curl

WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nestjs
RUN adduser  --system --uid 1001 nestjs

COPY --from=builder --chown=nestjs:nestjs /app/dist         ./dist
COPY --from=builder                       /app/node_modules ./node_modules
COPY --chown=nestjs:nestjs package.json ./

RUN mkdir -p /app/uploads && chown nestjs:nestjs /app/uploads

USER nestjs
EXPOSE 4000

HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=5 \
  CMD curl -f http://localhost:4000/api/v1/health || exit 1

CMD ["node", "dist/main"]
