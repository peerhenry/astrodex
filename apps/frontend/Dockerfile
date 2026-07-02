# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy dependency files first to leverage Docker layer caching
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies (including devDependencies needed for build)
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the production application
RUN pnpm run build

# Stage 2: Production runner
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Only copy the compiled build output from the builder stage
COPY --from=builder /app/.output ./.output

# Expose the internal container port
EXPOSE 3000

# Start the standalone Nitro server
CMD ["node", ".output/server/index.mjs"]