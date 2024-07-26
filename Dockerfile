# Common build stage
FROM node:14.14.0-alpine3.12 as common-build-stage


WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Clear npm cache
RUN npm cache clean --force

# Remove existing node_modules and package-lock.json if they exist
RUN rm -rf node_modules package-lock.json

RUN npm install

# Bundle app source
COPY . .


EXPOSE 80

# Development build stage, Don't run in production environment
# FROM common-build-stage as development-build-stage

## ENV NODE_ENV development

# CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]
