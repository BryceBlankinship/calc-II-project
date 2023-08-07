# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
FROM node:18

LABEL fly_launch_runtime="Node.js"

# Set production environment
ENV NODE_ENV="production"

COPY --link package.json yarn.lock ./
RUN yarn install --production=false

COPY . .
RUN yarn run build

EXPOSE 3000
CMD [ "yarn", "start" ]
