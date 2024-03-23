# Use a valid Docker image tag (remove the extra characters and correct the syntax)
FROM node:alpine AS builder

# Install necessary packages
RUN apk add make unzip curl
# The '•' character is replaced with a space and '--no-cache' is corrected
RUN apk --no-cache add ca-certificates wget

# Correct the command to download the public key for verifying glibc package
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub

# Download and install glibc package (corrected the URL and command syntax)
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk
RUN apk add --no-cache --force-overwrite glibc-2.28-r0.apk

# Install bun package manager
RUN npm install -g bun

# Corrected WORKDIR command (KORKDIR -> WORKDIR)
WORKDIR /build
ENV NODE_ENV production

# Copy package.json and bun.lockb (assuming bun.lockb is correct, otherwise it should be bun.lock)
COPY package.json package.json
COPY bun.lockb bun.lockb
# Install dependencies with bun
RUN bun install

# Copy the rest of the application
COPY . .

# Assuming environment variables are to be copied from a directory to the root
RUN bun run build



# Start a new stage with a newer Node.js version for the runner
FROM node:alpine AS runner
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/server ./server
COPY --from=builder /build/dist ./dist
CMD ["node", "server/entry.express.js"]